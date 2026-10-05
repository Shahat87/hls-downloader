import { a as releaseArtifactInCurrentContext, i as prepareTextDownloadInCurrentContext, o as cancelDiskBackedMux, r as prepareDownloadInCurrentContext } from "./disk-backed-fs-BQhKauW3.js";
//#region src/offscreen.ts
var chromeApi = globalThis.chrome;
chromeApi.runtime.onMessage.addListener((message, _sender, sendResponse) => {
	if (message?.target !== "offscreen") return;
	if (message.type === "prepare-download") {
		handlePrepareDownload(message).then((response) => sendResponse(response)).catch((error) => sendResponse({
			ok: false,
			message: error?.message || "Failed to prepare the download"
		}));
		return true;
	}
	if (message.type === "release-artifact") {
		handleReleaseArtifact(message).then((response) => sendResponse(response)).catch((error) => sendResponse({
			ok: false,
			message: error?.message || "Failed to release the download"
		}));
		return true;
	}
	if (message.type === "cancel-mux") {
		handleCancelMux(message).then((response) => sendResponse(response)).catch((error) => sendResponse({
			ok: false,
			message: error?.message || "Failed to cancel finalization"
		}));
		return true;
	}
	if (message.type === "prepare-text-download") {
		handlePrepareTextDownload(message).then((response) => sendResponse(response)).catch((error) => sendResponse({
			ok: false,
			message: error?.message || "Failed to prepare text download"
		}));
		return true;
	}
});
async function handlePrepareDownload(message) {
	if (!message.payload) return {
		ok: false,
		message: "Missing download payload"
	};
	return {
		ok: true,
		download: await prepareDownloadInCurrentContext(message.payload, (progress, status) => {
			if (!message.requestId) return;
			chromeApi.runtime.sendMessage({
				target: "background",
				type: "offscreen-progress",
				requestId: message.requestId,
				progress,
				message: status
			});
		})
	};
}
async function handleReleaseArtifact(message) {
	if (!message.artifact) return {
		ok: false,
		message: "Missing download artifact"
	};
	await releaseArtifactInCurrentContext(message.artifact);
	return { ok: true };
}
async function handleCancelMux(message) {
	if (!message.storageKey) return {
		ok: false,
		message: "Missing storage key"
	};
	await cancelDiskBackedMux(message.storageKey);
	return { ok: true };
}
async function handlePrepareTextDownload(message) {
	if (message.text === void 0 || !message.mime) return {
		ok: false,
		message: "Missing text download data"
	};
	return {
		ok: true,
		download: prepareTextDownloadInCurrentContext(message.text, message.mime)
	};
}
//#endregion

//# sourceMappingURL=offscreen.js.map