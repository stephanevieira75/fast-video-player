import { CONFIG, SELECTORS } from "./constants";
import { Elements } from "./types";

export const getRandomUuid = () => {
  return `${Math.random().toString(36).slice(2, 9)}`;
};

export const setId = (key: string) => `${CONFIG.name}--${key}`;

export const humanizeTime = (time: number) => {
  const totalMinutes = Math.floor(time / 60);
  const totalSeconds = Math.floor(time % 60);

  return `${totalMinutes < 10 ? "0" : ""}${totalMinutes}:${
    totalSeconds < 10 ? "0" : ""
  }${totalSeconds}`;
};

export const getElements = (shadowRoot: ShadowRoot): Elements => ({
  root: {
    element: shadowRoot.querySelector(`#${SELECTORS.rootId}`)!,
    video: {
      element: shadowRoot.querySelector(`#${SELECTORS.videoId}`)!,
    },
    overlay: {
      element: shadowRoot.querySelector(`#${SELECTORS.overlayId}`)!,
      top: {
        element: shadowRoot.querySelector(`#${SELECTORS.overlayTopId}`)!,
      },
      middle: {
        element: shadowRoot.querySelector(`#${SELECTORS.overlayMiddleId}`)!,
        fastBackward: shadowRoot.querySelector(
          `#${SELECTORS.fastBackwardBtnMiddleId}`
        )!,
        play: shadowRoot.querySelector(`#${SELECTORS.playBtnMiddleId}`)!,
        fastForward: shadowRoot.querySelector(
          `#${SELECTORS.fastForwardBtnMiddleId}`
        )!,
      },
      bottom: {
        element: shadowRoot.querySelector(`#${SELECTORS.overlayBottomId}`)!,
        navTime: shadowRoot.querySelector(
          `#${SELECTORS.overlayBottomNavTimeId}`
        )!,
        controls: {
          element: shadowRoot.querySelector(
            `#${SELECTORS.overlayBottomControlsId}`
          )!,
          left: {
            element: shadowRoot.querySelector(
              `#${SELECTORS.overlayBottomLeftControlsId}`
            )!,
            play: shadowRoot.querySelector(
              `#${SELECTORS.playBtnBottomControlsId}`
            )!,
            volume: shadowRoot.querySelector(
              `#${SELECTORS.volumeBtnBottomControlsId}`
            )!,
            volumeRange: shadowRoot.querySelector(
              `#${SELECTORS.volumeRangeBottomControlsId}`
            )!,
            volumeContainer: shadowRoot.querySelector(
              `#${SELECTORS.volumeContainerBottomControlsId}`
            )!,
            timeText: shadowRoot.querySelector(
              `#${SELECTORS.overlayBottomTimeTextId}`
            )!,
          },
          right: {
            element: document.createElement("div"),
            fullscreen: shadowRoot.querySelector(
              `#${SELECTORS.fullscreenBtnBottomControlsId}`
            )!,
          },
        },
      },
    },
  },
});

