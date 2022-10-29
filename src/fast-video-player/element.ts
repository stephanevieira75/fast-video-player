import { ICONS, SELECTORS } from "./constants";
import { DEFAULT_TEMPLATE_CONTENT } from "./template";
import { Elements } from "./types";
import { getElements, humanizeTime } from "./utils";

export class FastVideoPlayer extends HTMLElement {
  elements: Elements;
  mouseMoveTimeout: number = 0;

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      DEFAULT_TEMPLATE_CONTENT().cloneNode(true)
    );

    this.elements = this.setElements();
  }

  connectedCallback() {
    this.setElements();

    this.setupKeyEvents();

    this.setupVideoPlayer();

    this.setupOverlay();
  }

  disconnectedCallback() {
    document.removeEventListener("keydown", () => {});

    // Root
    this.elements.root.element.removeEventListener("mousemove", () => {});

    // Video
    this.elements.root.video.element.removeEventListener(
      "mouseenter",
      () => {}
    );
    this.elements.root.video.element.removeEventListener(
      "timeupdate",
      () => {}
    );

    // Overlay
    this.elements.root.overlay.element.removeEventListener(
      "mouseleave",
      () => {}
    );
    this.elements.root.overlay.bottom.navTime.removeEventListener(
      "click",
      () => {}
    );

    this.elements.root.overlay.bottom.controls.left.volumeContainer.removeEventListener(
      "mouseenter",
      () => {}
    );
    this.elements.root.overlay.bottom.controls.left.volumeContainer.removeEventListener(
      "mouseleave",
      () => {}
    );

    this.elements.root.overlay.bottom.controls.left.volumeRange.removeEventListener(
      "change",
      () => {}
    );
  }

  setElements(): Elements {
    this.elements = getElements(this.shadowRoot!);

    return this.elements;
  }

  setupVideoPlayer() {
    // Setup video player
    this.elements.root.video.element.setAttribute(
      "src",
      this.getAttribute("src") ?? ""
    );
    this.elements.root.video.element.volume = 0.5;

    // The mouseenter event is fired when user's mouse enters the video element
    this.elements.root.video.element.addEventListener("mouseenter", () => {
      this.elements.root.overlay.element.classList.add(
        SELECTORS.overlayVisibleClassname
      );

      // After 4 seconds, hide the overlay
      setTimeout(() => {
        this.elements.root.overlay.element.classList.remove(
          SELECTORS.overlayVisibleClassname
        );
      }, 4000);
    });

    this.elements.root.element.addEventListener("mousemove", () => {
      this.handleOverlayVisibility();
    });

    // The mouseleave event is fired when user leave the overlay
    this.elements.root.overlay.element.addEventListener("mouseleave", () => {
      this.elements.root.overlay.element.classList.remove(
        SELECTORS.overlayVisibleClassname
      );
    });
  }

  setupKeyEvents() {
    document.addEventListener("keydown", (e) => {
      this.handleOverlayVisibility();

      if (e.code === "Space") {
        this.handlePlayOrPause();
      }

      if (e.code === "KeyF") {
        this.handleFullscreen();
      }

      if (e.code === "ArrowLeft") {
        this.handleFastBackward();
      }

      if (e.code === "ArrowRight") {
        this.handleFastForward();
      }

      if (e.code === "ArrowUp") {
        this.handleVolumeChange({
          increment: true,
        });
      }

      if (e.code === "ArrowDown") {
        this.handleVolumeChange({
          decrement: true,
        });
      }

      // KeyM
      if (e.code === "Semicolon") {
        this.handleVolumeMute();
      }
    });
  }

  setupOverlay() {
    // Setup all buttons
    this.setupOverlayButtons();

    // Setup time text
    this.setupTimeText();

    // Setup nav time
    this.setupNavTime();
  }

  setupButton({
    id,
    btn,
    icon,
    alt,
    onClick,
  }: {
    id: string;
    btn: HTMLButtonElement;
    icon: string;
    alt: string;
    onClick: () => void;
  }) {
    btn.setAttribute("id", id);

    const image = document.createElement("img");
    image.setAttribute("src", icon);
    image.setAttribute("alt", alt);

    btn.addEventListener("click", onClick);

    btn.appendChild(image);
  }

  setupOverlayButtons() {
    // Setup fast backward button
    this.setupButton({
      id: SELECTORS.fastBackwardBtnMiddleId,
      btn: this.elements.root.overlay.middle.fastBackward,
      icon: ICONS.fastBackward,
      alt: "fast-backward",
      onClick: () => this.handleFastBackward(),
    });

    // Setup middle play button
    this.setupButton({
      id: SELECTORS.playBtnMiddleId,
      btn: this.elements.root.overlay.middle.play,
      icon: ICONS.play,
      alt: "play",
      onClick: () => this.handlePlayOrPause(),
    });

    // Setup fast forward button
    this.setupButton({
      id: SELECTORS.fastForwardBtnMiddleId,
      btn: this.elements.root.overlay.middle.fastForward,
      icon: ICONS.fastForward,
      alt: "fast-forward",
      onClick: () => this.handleFastForward(),
    });

    // Setup bottom play button
    this.setupButton({
      id: SELECTORS.playBtnBottomControlsId,
      btn: this.elements.root.overlay.bottom.controls.left.play,
      icon: ICONS.play,
      alt: "play",
      onClick: () => this.handlePlayOrPause(),
    });

    // Setup volume button
    this.setupButton({
      id: SELECTORS.volumeBtnBottomControlsId,
      btn: this.elements.root.overlay.bottom.controls.left.volume,
      icon: ICONS.volumeHigh,
      alt: "volume",
      onClick: () => this.handleVolumeMute(),
    });

    // Setup volume range
    this.setupVolumeRange();

    // Setup fullscreen button
    this.setupButton({
      id: SELECTORS.fullscreenBtnBottomControlsId,
      btn: this.elements.root.overlay.bottom.controls.right.fullscreen,
      icon: ICONS.maximize,
      alt: "fullscreen",
      onClick: () => this.handleFullscreen(),
    });
  }

  setupVolumeRange() {
    if (this.elements.root.video.element.volume) {
      this.elements.root.overlay.bottom.controls.left.volumeRange.value =
        String(this.elements.root.video.element.volume * 100);

      this.setVolumeBtnIcon("medium");
    }

    this.elements.root.overlay.bottom.controls.left.volumeRange.setAttribute(
      "value",
      String(this.elements.root.video.element.volume * 100)
    );

    this.elements.root.overlay.bottom.controls.left.volumeContainer.addEventListener(
      "mouseenter",
      () => {
        this.elements.root.overlay.bottom.controls.left.volumeRange.style.display =
          "block";
      }
    );

    this.elements.root.overlay.bottom.controls.left.volumeContainer.addEventListener(
      "mouseleave",
      () => {
        this.elements.root.overlay.bottom.controls.left.volumeRange.style.display =
          "none";
      }
    );

    this.elements.root.overlay.bottom.controls.left.volumeRange.addEventListener(
      "change",
      () =>
        this.handleVolumeChange({
          rangeValue: Number(
            this.elements.root.overlay.bottom.controls.left.volumeRange.value
          ),
        })
    );
  }

  setPlayBtnIcon(status: "play" | "pause" | "replay") {
    this.elements.root.overlay.middle.play.innerHTML = "";
    this.elements.root.overlay.bottom.controls.left.play.innerHTML = "";

    const map = new Map<string, string>();

    map.set("play", ICONS.play);
    map.set("pause", ICONS.pause);
    map.set("replay", ICONS.replay);

    const image = document.createElement("img");
    image.setAttribute("src", map.get(status)!);
    image.setAttribute("alt", status);

    this.elements.root.overlay.middle.play.appendChild(image);
    this.elements.root.overlay.bottom.controls.left.play.appendChild(
      image.cloneNode(true)
    );
  }

  setVolumeBtnIcon(status: "medium" | "mute" | "low" | "high") {
    this.elements.root.overlay.bottom.controls.left.volume.innerHTML = "";
    const map = new Map<string, string>();

    map.set("medium", ICONS.volumeMedium);
    map.set("mute", ICONS.volumeMute);
    map.set("low", ICONS.volumeLow);
    map.set("high", ICONS.volumeHigh);

    const image = document.createElement("img");
    image.setAttribute("src", map.get(status)!);
    image.setAttribute("alt", status);

    this.elements.root.overlay.bottom.controls.left.volume.appendChild(image);
  }

  setupNavTime() {
    this.elements.root.overlay.bottom.navTime.setAttribute("type", "range");
    this.elements.root.overlay.bottom.navTime.setAttribute("min", "0");
    this.elements.root.overlay.bottom.navTime.setAttribute("max", "100");
    this.elements.root.overlay.bottom.navTime.setAttribute("value", "0");

    this.elements.root.video.element.addEventListener("timeupdate", () => {
      if (
        !this.elements.root.overlay.element.classList.contains(
          SELECTORS.overlayVisibleClassname
        )
      )
        return;

      const percent =
        (this.elements.root.video.element.currentTime /
          this.elements.root.video.element.duration) *
        100;

      if (
        this.elements.root.video.element.currentTime ===
        this.elements.root.video.element.duration
      ) {
        this.setPlayBtnIcon("replay");
        return;
      }

      this.elements.root.overlay.bottom.navTime.value = String(percent);
    });

    this.elements.root.overlay.bottom.navTime.addEventListener("click", () => {
      if (
        !this.elements.root.overlay.element.classList.contains(
          SELECTORS.overlayVisibleClassname
        )
      )
        return;

      const percent = this.elements.root.overlay.bottom.navTime.value;

      this.elements.root.video.element.currentTime =
        (Number(percent) / 100) * this.elements.root.video.element.duration;
    });
  }

  setupTimeText() {
    this.elements.root.video.element.addEventListener("timeupdate", () => {
      if (
        !this.elements.root.overlay.element.classList.contains(
          SELECTORS.overlayVisibleClassname
        )
      )
        return;

      this.elements.root.overlay.bottom.controls.left.timeText.textContent = `${humanizeTime(
        this.elements.root.video.element.currentTime
      )} / ${humanizeTime(this.elements.root.video.element.duration)}`;
    });
  }

  handlePlayOrPause() {
    if (this.elements.root.video.element.paused) {
      this.elements.root.video.element.play();
      this.setPlayBtnIcon("pause");
    } else {
      this.elements.root.video.element.pause();
      this.setPlayBtnIcon("play");
    }
  }

  handleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      this.elements.root.overlay.bottom.controls.right.fullscreen.innerHTML =
        "";
      const image = document.createElement("img");
      image.setAttribute("src", ICONS.maximize);
      image.setAttribute("alt", "fullscreen");
      this.elements.root.overlay.bottom.controls.right.fullscreen.appendChild(
        image
      );

      return;
    }

    this.elements.root.element.requestFullscreen();
    this.elements.root.overlay.bottom.controls.right.fullscreen.innerHTML = "";
    const image = document.createElement("img");
    image.setAttribute("src", ICONS.minimize);
    image.setAttribute("alt", "fullscreen");
    this.elements.root.overlay.bottom.controls.right.fullscreen.appendChild(
      image
    );
  }

  handleFastBackward() {
    this.elements.root.video.element.currentTime -= 10;
  }

  handleFastForward() {
    this.elements.root.video.element.currentTime += 10;
  }

  handleVolumeMute() {
    if (
      Number(
        this.elements.root.overlay.bottom.controls.left.volumeRange.value
      ) > 0
    ) {
      this.elements.root.video.element.volume = 0;
      this.elements.root.overlay.bottom.controls.left.volumeRange.value = "0";
      this.setVolumeBtnIcon("mute");
      return;
    }

    this.elements.root.video.element.volume = 0.5;
    this.elements.root.overlay.bottom.controls.left.volumeRange.value = "50";
    this.setVolumeBtnIcon("medium");
  }

  handleOverlayVisibility() {
    if (
      this.elements.root.overlay.element.classList.contains(
        SELECTORS.cursorHiddenClassname
      ) ||
      this.elements.root.video.element.classList.contains(
        SELECTORS.cursorHiddenClassname
      )
    ) {
      this.elements.root.video.element.classList.remove(
        SELECTORS.cursorHiddenClassname
      );
      this.elements.root.overlay.element.classList.remove(
        SELECTORS.cursorHiddenClassname
      );
    }

    clearTimeout(this.mouseMoveTimeout);

    // if user stop moving mouse hide cursor
    this.mouseMoveTimeout = setTimeout(() => {
      this.elements.root.video.element.classList.add(
        SELECTORS.cursorHiddenClassname
      );
      this.elements.root.overlay.element.classList.add(
        SELECTORS.cursorHiddenClassname
      );
    }, 6000);
  }

  handleVolumeChange({
    increment,
    decrement,
    rangeValue,
  }: {
    increment?: boolean;
    decrement?: boolean;
    rangeValue?: number;
  }) {
    let volume = Number(
      rangeValue ??
        this.elements.root.overlay.bottom.controls.left.volumeRange.value ??
        0
    );

    if (increment || decrement) {
      volume = this.elements.root.video.element.volume * 100;
    }

    if (increment && (volume < 100 || this.elements.root.video.element.muted)) {
      volume += 10;
      this.elements.root.overlay.bottom.controls.left.volumeRange.value =
        String(volume);
    }

    if (decrement && volume > 0) {
      volume -= 10;
      this.elements.root.overlay.bottom.controls.left.volumeRange.value =
        String(volume);
    }

    if (volume < 0) {
      volume = 0;
    }

    if (volume > 100) {
      volume = 100;
    }

    if (volume === 0 || this.elements.root.video.element.muted) {
      this.setVolumeBtnIcon("mute");
    }

    if (volume > 0 && volume <= 50) {
      this.setVolumeBtnIcon("medium");
    }

    if (volume > 60 && volume <= 100) {
      this.setVolumeBtnIcon("high");
    }

    this.elements.root.video.element.volume = volume / 100;
  }
}
