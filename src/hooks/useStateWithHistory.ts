import { useCallback, useRef, useState } from "react";

interface UseStateWithHistoryReturnValue {
  history: string[];
  pointer: number;
  back: () => void;
  forward: () => void;
  go: (index: number) => void;
}

export default function useStateWithHistory(
  defaultValue: string,
  { capacity = 10 } = {}
): [string, (newValue: string) => void, UseStateWithHistoryReturnValue] {
  const [value, setValue] = useState(defaultValue);
  const historyRef = useRef([value]);
  const pointerRef = useRef(0);

  const set = useCallback(
    (newValue: string) => {
      if (historyRef.current[pointerRef.current] !== newValue) {
        if (pointerRef.current < historyRef.current.length - 1) {
          historyRef.current.splice(pointerRef.current + 1);
        }
        historyRef.current.push(newValue);

        while (historyRef.current.length > capacity) {
          historyRef.current.shift();
        }
        pointerRef.current = historyRef.current.length - 1;
      }
      setValue(newValue);
    },
    [capacity]
  );

  const back = useCallback(() => {
    if (pointerRef.current <= 0) return;
    pointerRef.current -= 1;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const forward = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return;
    pointerRef.current += 1;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  const go = useCallback((index: number) => {
    if (index < 0 || index > historyRef.current.length - 1) return;
    pointerRef.current = index;
    setValue(historyRef.current[pointerRef.current]);
  }, []);

  return [
    value,
    set,
    {
      history: historyRef.current,
      pointer: pointerRef.current,
      back,
      forward,
      go,
    },
  ];
}
