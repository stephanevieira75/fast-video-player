import { setId } from "./utils";

export const CONFIG = {
  name: "fast-video-player",
  attrToExclude: ["controls"],
};

export const SELECTORS = {
  // Ids
  rootId: setId("root"),
  videoId: setId("video"),
  overlayId: setId("overlay"),
  overlayTopId: setId("overlay-top"),
  overlayMiddleId: setId("overlay-middle"),
  overlayBottomId: setId("overlay-bottom"),
  overlayBottomControlsId: setId("overlay-bottom-controls"),
  overlayBottomLeftControlsId: setId("overlay-bottom-left-controls"),
  overlayBottomTimeTextId: setId("overlay-bottom-time-text"),
  fastForwardBtnMiddleId: setId("fast-forward-btn-middle"),
  fastBackwardBtnMiddleId: setId("fast-backward-btn-middle"),
  playBtnMiddleId: setId("play-btn-middle"),
  playBtnBottomControlsId: setId("play-btn-bottom-controls"),
  volumeBtnBottomControlsId: setId("volume-btn-bottom-controls"),
  volumeRangeBottomControlsId: setId("volume-range-bottom-controls"),
  volumeContainerBottomControlsId: setId("volume-container-bottom-controls"),
  fullscreenBtnBottomControlsId: setId("fullscreen-btn-bottom-controls"),
  overlayBottomNavTimeId: setId("overlay-bottom-timeline"),

  // Classnames
  overlayVisibleClassname: setId("overlay-visible"),
  cursorHiddenClassname: setId("cursor-hidden"),
};

export const ICONS = {
  play: "src/fast-video-player/assets/play.svg",
  pause: "src/fast-video-player/assets/pause.svg",
  replay: "src/fast-video-player/assets/replay.svg",
  fastForward: "src/fast-video-player/assets/fast-forward.svg",
  fastBackward: "src/fast-video-player/assets/fast-backward.svg",
  maximize: "src/fast-video-player/assets/maximize.svg",
  minimize: "src/fast-video-player/assets/minimize.svg",
  volumeMute: "src/fast-video-player/assets/volume-mute.svg",
  volumeLow: "src/fast-video-player/assets/volume-low.svg",
  volumeMedium: "src/fast-video-player/assets/volume-medium.svg",
  volumeHigh: "src/fast-video-player/assets/volume-high.svg",
};
