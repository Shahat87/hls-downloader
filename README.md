# HLS Downloader (built, with JW Player subtitles patch)

Built Chrome extension (MV3) based on HLS Downloader v5.5.0, patched so it also downloads
subtitles for JW Player streams (e.g. learn.corporatefinanceinstitute.com).

## Patch (background.js)
- For `jwplatform/jwplayer/jwpsrv` `*/manifests/<id>.m3u8`, fetches `cdn.jwplayer.com/v2/media/<id>`
  and injects its caption tracks as `#EXT-X-MEDIA:TYPE=SUBTITLES` entries.
- Direct `.srt/.vtt` (and JW `/tracks/`) URLs are fetched as plain text instead of parsed as playlists.
- Saves `.srt` unless content is WebVTT.

## Install
`chrome://extensions` → Developer mode → Load unpacked → select this folder.

## Also added
- Settings → "Preferred subtitle language": auto-selects the matching subtitle track for new streams.
- Subtitles are converted to WebVTT for muxing into the `.mkv`, and a separate `.srt` is saved next to the video.
