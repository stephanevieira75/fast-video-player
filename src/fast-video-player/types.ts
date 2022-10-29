export type Elements = {
  root: {
    element: HTMLDivElement;
    video: {
      element: HTMLVideoElement;
    };
    overlay: {
      element: HTMLDivElement;

      top: {
        element: HTMLDivElement;
      };

      middle: {
        element: HTMLDivElement;

        fastBackward: HTMLButtonElement;
        play: HTMLButtonElement;
        fastForward: HTMLButtonElement;
      };

      bottom: {
        element: HTMLDivElement;

        navTime: HTMLInputElement;
        controls: {
          element: HTMLDivElement;

          left: {
            element: HTMLDivElement;

            play: HTMLButtonElement;
            volume: HTMLButtonElement;
            volumeRange: HTMLInputElement;
            volumeContainer: HTMLDivElement;
            timeText: HTMLSpanElement;
          };
          right: {
            element: HTMLDivElement;

            fullscreen: HTMLButtonElement;
          };
        };
      };
    };
  };
};
