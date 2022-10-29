import { SELECTORS } from "../constants";

export const DEFAULT_SIZES = {
  width: "100%",
  height: "100%",
};

export const DEFAULT_STYLES = `
<style>
    #${SELECTORS.rootId} {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: ${DEFAULT_SIZES.width};
    height: ${DEFAULT_SIZES.height};

    z-index: 0;
    }

    #${SELECTORS.videoId} {
    width: ${DEFAULT_SIZES.width};
    height: ${DEFAULT_SIZES.height};

    z-index: 1;
    }

    #${SELECTORS.overlayId} {
    width: ${DEFAULT_SIZES.width};
    height: ${DEFAULT_SIZES.height};

    visibility: hidden;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.5);
    transition: .1s ease;
    opacity: 0.5;

    z-index: 2;
    }

    .${SELECTORS.overlayVisibleClassname} {
    visibility: visible !important;
    }

    /*
    Overlay top
    */
    #${SELECTORS.overlayTopId} {
    width: 100%;
    }

    /*
    Overlay middle
    */
    #${SELECTORS.overlayMiddleId} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 25vw;
    }

    #${SELECTORS.playBtnMiddleId} {
    width: 60px;
    height: 60px;
    }

    #${SELECTORS.fastForwardBtnMiddleId}, #${SELECTORS.fastBackwardBtnMiddleId} {
    width: 50px;
    height: 50px;
    }

    #${SELECTORS.playBtnMiddleId}, #${SELECTORS.fastForwardBtnMiddleId}, #${SELECTORS.fastBackwardBtnMiddleId} {
    border-radius: 50%;
    border: 0;
    cursor: pointer;

    background: black;
    background-opacity: 0.5;
    }


    /*
    Overlay bottom
    */
    #${SELECTORS.overlayBottomId} {
    width: 100%;
    }

    #${SELECTORS.overlayBottomControlsId} {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    }

    #${SELECTORS.overlayBottomLeftControlsId} {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    }

    #${SELECTORS.playBtnBottomControlsId}, #${SELECTORS.volumeBtnBottomControlsId}, #${SELECTORS.fullscreenBtnBottomControlsId} {
    width: 46px;
    height: 46px;
    background: none;
    border: 0;
    cursor: pointer;
    }

    #${SELECTORS.volumeContainerBottomControlsId} {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    }

    #${SELECTORS.volumeRangeBottomControlsId} {
    display: none;
    width: 100px;
    height: 5px;

    margin-right: 10px;
    }

    @keyframes volumeRangeShow {
    0% {
      width: 0;
    }
    100% {
      width: 100px;
    }
    }

    #${SELECTORS.volumeContainerBottomControlsId}:hover #${SELECTORS.volumeRangeBottomControlsId} {
    animation: volumeRangeShow .1s ease;

    display: block;
    }

    #${SELECTORS.overlayBottomNavTimeId} {
    width: 100%;
    height: 5px;
    padding: 0;
    cursor: pointer;
    }

    #${SELECTORS.overlayBottomTimeTextId} {
    font-size: 16px;
    color: #fff;
    }

    .${SELECTORS.cursorHiddenClassname} {
    cursor: none !important;
    }
</style>
`;
