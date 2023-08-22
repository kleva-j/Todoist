import { useState, RefObject, useEffect, useRef } from "react";

function UseFullscreenStatus(elRef: RefObject<HTMLElement>) {
  const fullScreenElement = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const setFullscreen = () => {
    if (elRef.current == null) return;
    if (fullScreenElement.current === null) {
      elRef.current.requestFullscreen().catch(() => setIsFullscreen(false));
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
      return;
    }
  };

  useEffect(() => {
    fullScreenElement.current =
      document[getBrowserFullscreenElementProp() as keyof Document];
    setIsFullscreen(() => fullScreenElement.current !== null);

    document.onfullscreenchange = function () {
      fullScreenElement.current =
        this[getBrowserFullscreenElementProp() as keyof Document];
      setIsFullscreen(fullScreenElement.current != null);
    };

    return () => (document.onfullscreenchange = (() => {}) as any);
  }, []);

  return { isFullscreen, setFullscreen };
}

export { UseFullscreenStatus };

function getBrowserFullscreenElementProp(): string {
  let document: any = window.document;
  if (typeof document.fullscreenElement !== "undefined") {
    return "fullscreenElement";
  } else if (typeof document.mozFullScreenElement !== "undefined") {
    return "mozFullScreenElement";
  } else if (typeof document.msFullscreenElement !== "undefined") {
    return "msFullscreenElement";
  } else if (typeof document.webkitFullscreenElement !== "undefined") {
    return "webkitFullscreenElement";
  } else {
    throw new Error("fullscreenElement is not supported by this browser");
  }
}
