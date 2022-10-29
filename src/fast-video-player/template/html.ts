import { SELECTORS } from "../constants";

export const DEFAULT_HTML = `
<div id="${SELECTORS.rootId}">
  <video id="${SELECTORS.videoId}"></video>

  <div id="${SELECTORS.overlayId}">
  <!-- Overlay top -->
  <div id="${SELECTORS.overlayTopId}"></div>

  <!-- Overlay middle -->
  <div id="${SELECTORS.overlayMiddleId}">
    <button id="${SELECTORS.fastBackwardBtnMiddleId}"></button>
    <button id="${SELECTORS.playBtnMiddleId}"></button>
    <button id="${SELECTORS.fastForwardBtnMiddleId}"></button>
  </div>

  <!-- Overlay bottom -->
  <div id="${SELECTORS.overlayBottomId}">
    <input type="range" id="${SELECTORS.overlayBottomNavTimeId}" />
    <div id="${SELECTORS.overlayBottomControlsId}">
      <div id="${SELECTORS.overlayBottomLeftControlsId}">
        <button id="${SELECTORS.playBtnBottomControlsId}"></button>
        <div id="${SELECTORS.volumeContainerBottomControlsId}">
          <button id="${SELECTORS.volumeBtnBottomControlsId}"></button>
          <input type="range" id="${SELECTORS.volumeRangeBottomControlsId}" />
        </div>
        <span id="${SELECTORS.overlayBottomTimeTextId}"></span>
      </div>

      <button id="${SELECTORS.fullscreenBtnBottomControlsId}"></button>
    </div>
  </div>
</div>
`;
