(function() {
	//#region src/services/ffmpeg-muxer.ts
	function detectFmp4(data) {
		if (data.length < 8) return false;
		return String.fromCharCode(data[4], data[5], data[6], data[7]) === "ftyp";
	}
	function isMp4ContainerFile(fileName) {
		return /\.(m4a|m4v|mp4)$/i.test(fileName);
	}
	function isMp4Container(fileName, container) {
		return container ? container === "mp4" : isMp4ContainerFile(fileName);
	}
	function buildMuxArgs({ outputFileName, hasVideo, hasAudio, videoFileName = "video.ts", audioFileName = "audio.ts", videoContainer, audioContainer, subtitleText, subtitleLanguage, outputFormat }) {
		const includeSubtitles = subtitleText !== void 0;
		if (!hasVideo && !hasAudio) throw new Error("No media to mux");
		const audioNeedsAdtsToAsc = hasAudio && !isMp4Container(audioFileName, audioContainer);
		const args = ["-y"];
		if (hasVideo) args.push("-i", videoFileName);
		if (hasAudio) args.push("-i", audioFileName);
		if (includeSubtitles) args.push("-i", "subtitles.vtt");
		if (hasVideo && hasAudio) {
			args.push("-map", "0:v:0", "-map", "1:a:0?");
			if (includeSubtitles) args.push("-map", "2:s:0");
			args.push("-c:v", "copy", "-c:a", "copy");
			if (audioNeedsAdtsToAsc) args.push("-bsf:a", "aac_adtstoasc");
		} else if (hasVideo) {
			args.push("-map", "0:v", "-map", "0:a?", "-c", "copy");
			if (includeSubtitles) args.push("-map", "1:s:0", "-c:s", "webvtt");
		} else if (hasAudio) {
			args.push("-map", "0:a:0", "-c:a", "aac", "-b:a", "192k", "-af", "aresample=async=1:first_pts=0");
			if (includeSubtitles) args.push("-map", "1:s:0");
		}
		if (includeSubtitles) {
			args.push("-c:s", "webvtt");
			args.push("-metadata:s:s:0", `language=${subtitleLanguage || "und"}`);
		}
		if (hasVideo && hasAudio) args.push("-shortest");
		if (outputFormat) args.push("-f", outputFormat);
		args.push(outputFileName);
		return args;
	}
	//#endregion
	//#region src/services/opfs-storage.ts
	const ROOT_DIRECTORY = "hls-downloader";
	const VERSION_DIRECTORY = "v1";
	const JOBS_DIRECTORY = "jobs";
	const EXPORTS_DIRECTORY = "exports";
	function fragmentFileName(index) {
		return `${String(index).padStart(9, "0")}.part`;
	}
	function getStorageManager() {
		const storage = globalThis.navigator?.storage;
		if (!storage?.getDirectory) throw new Error("This browser cannot use disk-backed downloads. Upgrade to Firefox 115 or Chromium 109.");
		return storage;
	}
	async function getVersionDirectory() {
		return await (await (await getStorageManager().getDirectory()).getDirectoryHandle(ROOT_DIRECTORY, { create: true })).getDirectoryHandle(VERSION_DIRECTORY, { create: true });
	}
	async function getJobsDirectory(create = true) {
		return await (await getVersionDirectory()).getDirectoryHandle(JOBS_DIRECTORY, { create });
	}
	async function getExportsDirectory(create = true) {
		return await (await getVersionDirectory()).getDirectoryHandle(EXPORTS_DIRECTORY, { create });
	}
	async function getJobDirectory(storageKey, create = true) {
		return await (await getJobsDirectory(create)).getDirectoryHandle(storageKey, { create });
	}
	async function getTrackDirectory(storageKey, track, create = true) {
		return await (await getJobDirectory(storageKey, create)).getDirectoryHandle(track, { create });
	}
	async function getFragmentFile(storageKey, track, index) {
		return await (await (await getTrackDirectory(storageKey, track, false)).getFileHandle(fragmentFileName(index))).getFile();
	}
	async function getExportHandle(exportId, create = false) {
		return await (await getExportsDirectory(create)).getFileHandle(exportId, { create });
	}
	async function deleteExportFile(exportId) {
		try {
			await (await getExportsDirectory(false)).removeEntry(exportId);
		} catch (error) {
			if (error?.name !== "NotFoundError") throw error;
		}
	}
	//#endregion
	//#region src/services/seekable-opfs-output.ts
	const OPFS_OUTPUT_DEVICE_PATH = "/dev/opfs-output";
	function registerSeekableOpfsOutputDevice(core, accessHandle) {
		const handle = accessHandle;
		const device = core.FS.makedev(80, 0);
		core.FS.registerDevice(device, {
			open(stream) {
				stream.seekable = true;
			},
			close() {
				handle.flush();
			},
			read(stream, buffer, offset, length, position) {
				const at = Number(position ?? stream.position ?? 0);
				return handle.read(buffer.subarray(offset, offset + length), { at });
			},
			write(stream, buffer, offset, length, position) {
				const at = Number(position ?? stream.position ?? 0);
				const written = handle.write(buffer.subarray(offset, offset + length), { at });
				stream.node.size = Math.max(stream.node.size ?? 0, at + written);
				stream.node.timestamp = Date.now();
				return written;
			},
			llseek(stream, offset, whence) {
				let next = Number(offset);
				if (whence === 1) next += Number(stream.position ?? 0);
				else if (whence === 2) next += Number(handle.getSize());
				if (next < 0) throw new core.FS.ErrnoError(28);
				return next;
			}
		});
		core.FS.mkdev(OPFS_OUTPUT_DEVICE_PATH, 438, device);
	}
	//#endregion
	//#region src/workers/disk-mux-worker.ts
	const workerScope = globalThis;
	function post(message) {
		workerScope.postMessage(message);
	}
	function progress(requestId, value, message) {
		post({
			type: "progress",
			requestId,
			progress: Math.max(0, Math.min(1, value)),
			message
		});
	}
	async function loadCore(coreURL, wasmURL, requestId) {
		progress(requestId, .01, "Loading FFmpeg");
		const createFFmpegCore = (await import(
			/* @vite-ignore */
			coreURL
)).default;
		if (typeof createFFmpegCore !== "function") throw new Error("The bundled FFmpeg core could not be loaded");
		const core = await createFFmpegCore({ mainScriptUrlOrBlob: `${coreURL}#${btoa(JSON.stringify({
			wasmURL,
			workerURL: ""
		}))}` });
		core.setProgress?.(({ progress: value }) => {
			progress(requestId, .1 + Math.max(0, Math.min(1, value)) * .85, "Muxing");
		});
		return core;
	}
	async function mountTrack(core, storageKey, track, length) {
		if (length === 0) return;
		const files = [];
		const missing = [];
		for (let index = 0; index < length; index++) try {
			files.push(await getFragmentFile(storageKey, track, index));
		} catch (error) {
			if (error?.name === "NotFoundError") {
				missing.push(index);
				continue;
			}
			throw error;
		}
		if (missing.length > 0) {
			const preview = missing.slice(0, 10).join(", ");
			const suffix = missing.length > 10 ? ", …" : "";
			throw new Error(`Cannot finalize: ${track} is missing ${missing.length} fragment(s) (${preview}${suffix})`);
		}
		const container = detectFmp4(new Uint8Array(await files[0].slice(0, 8).arrayBuffer())) ? "mp4" : "mpegts";
		const extension = container === "mp4" ? "mp4" : "ts";
		const mountPoint = `/inputs/${track}`;
		core.FS.mkdirTree(mountPoint);
		const blobs = files.map((file, index) => ({
			name: `${track}-${String(index).padStart(9, "0")}.${extension}`,
			data: file
		}));
		core.FS.mount(core.FS.filesystems.WORKERFS, { blobs }, mountPoint);
		if (blobs.length === 1) return {
			fileName: `${mountPoint}/${blobs[0].name}`,
			container,
			mountPoint
		};
		const listFileName = `/${track}.concat.txt`;
		const list = `${blobs.map((entry) => `${mountPoint}/${entry.name}`).join("\n")}\n`;
		core.FS.writeFile(listFileName, new TextEncoder().encode(list));
		return {
			fileName: `concatf:${listFileName}`,
			container,
			mountPoint,
			listFileName
		};
	}
	async function mux(request) {
		const { requestId, storageKey, videoLength, audioLength, subtitleText, subtitleLanguage, exportId } = request;
		let accessHandle;
		let core;
		let videoInput;
		let audioInput;
		try {
			core = await loadCore(request.coreURL, request.wasmURL, requestId);
			progress(requestId, .05, "Preparing disk-backed inputs");
			videoInput = await mountTrack(core, storageKey, "video", videoLength);
			audioInput = await mountTrack(core, storageKey, "audio", audioLength);
			if (subtitleText !== void 0) core.FS.writeFile("/subtitles.vtt", new TextEncoder().encode(subtitleText));
			const outputContainer = subtitleText !== void 0 ? "mkv" : request.container;
			const outputFormat = outputContainer === "mkv" ? "matroska" : "mp4";
			const mime = outputContainer === "mkv" ? "video/x-matroska" : "video/mp4";
			const outputHandle = await getExportHandle(exportId, true);
			accessHandle = await outputHandle.createSyncAccessHandle();
			accessHandle.truncate(0);
			registerSeekableOpfsOutputDevice(core, accessHandle);
			const args = buildMuxArgs({
				outputFileName: OPFS_OUTPUT_DEVICE_PATH,
				outputFormat,
				hasVideo: videoLength > 0,
				hasAudio: audioLength > 0,
				videoFileName: videoInput?.fileName,
				audioFileName: audioInput?.fileName,
				videoContainer: videoInput?.container,
				audioContainer: audioInput?.container,
				subtitleText,
				subtitleLanguage
			});
			progress(requestId, .1, "Muxing");
			const exitCode = core.exec(...args);
			core.reset();
			if (exitCode !== 0) throw new Error(`FFmpeg exited with code ${exitCode}`);
			await Promise.resolve(accessHandle.flush());
			await Promise.resolve(accessHandle.close());
			accessHandle = void 0;
			const outputFile = await outputHandle.getFile();
			if (outputFile.size === 0) throw new Error("FFmpeg produced an empty output file");
			progress(requestId, 1, "Ready to download");
			post({
				type: "success",
				requestId,
				exportId,
				mime,
				size: outputFile.size,
				wasmMemoryBytes: core.HEAPU8?.buffer?.byteLength ?? 0
			});
		} catch (error) {
			try {
				await Promise.resolve(accessHandle?.close?.());
			} catch (_closeError) {}
			await deleteExportFile(exportId).catch(() => void 0);
			post({
				type: "failure",
				requestId,
				message: error?.name === "QuotaExceededError" ? "Not enough disk space to finalize this download" : error instanceof Error ? error.message : String(error)
			});
		} finally {
			if (core) for (const input of [videoInput, audioInput]) {
				if (!input) continue;
				try {
					core.FS.unmount(input.mountPoint);
				} catch (_error) {}
			}
		}
	}
	workerScope.onmessage = ({ data }) => {
		if (data?.type === "mux") mux(data);
	};
	//#endregion
})();

//# sourceMappingURL=disk-mux-worker-WR13xe1v.js.map