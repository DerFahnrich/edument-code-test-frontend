import { RefObject, useEffect, useRef } from "react";

function useEventListener<T extends HTMLElement = HTMLDivElement>(
  eventName: keyof WindowEventMap | string,
  handler: (event: Event) => void,
  element?: RefObject<T>
): void {
  // Create a ref that stores handler
  const savedHandler = useRef<(event: Event) => void>();

  useEffect(() => {
    // Define the listening target
    const targetElement: T | Window = element?.current || window;

    // Update saved handler if necessary
    if (savedHandler.current !== handler) {
      savedHandler.current = handler;
    }

    // Create event listener that calls handler function stored in ref
    const eventListener = (event: Event) => {
      if (savedHandler?.current) {
        savedHandler.current(event);
      }
    };

    targetElement.addEventListener(eventName, eventListener);

    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element, handler]);
}

export default useEventListener;
