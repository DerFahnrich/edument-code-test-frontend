import { useCallback, useRef, useState } from "react";

interface UseStateWithHistoryReturnValue {
  history: string[];
  pointer: number;
  back: () => void;
  forward: () => void;
}

/**
 * A hook that wraps the useState hook but adds the functionality to keep track of the
 * history of all the changes and switch back and forth in the saved history array.
 * @param defaultValue The default value to use in the useState hook.
 * @param capcity The number of history edits they should be saved. Default value is 10.
 * @returns An array with the different values and functions that the hooks supplies.
 */
function useStateWithHistory(
  defaultValue: string,
  { capacity = 10 } = {}
): [string, (newValue: string) => void, UseStateWithHistoryReturnValue] {
  const [value, setValue] = useState(defaultValue);
  const historyRef = useRef([value]);
  const pointerRef = useRef(0);

  /**
   * A method that works the same was as a set function in a useState,
   * but it also adds to the history array or modifies it.
   * @param newValue
   * @return void
   */
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

  /**
   * Jumps back one slot in the history array and updates the value.
   * @returns void
   */
  const back = () => {
    if (pointerRef.current <= 0) return;
    pointerRef.current -= 1;
    setValue(historyRef.current[pointerRef.current]);
  };

  /**
   * Jumps forward one slot in the history array and updates the value.
   * @returns void
   */
  const forward = () => {
    if (pointerRef.current >= historyRef.current.length - 1) return;
    pointerRef.current += 1;
    setValue(historyRef.current[pointerRef.current]);
  };

  return [
    value,
    set,
    {
      history: historyRef.current,
      pointer: pointerRef.current,
      back,
      forward,
    },
  ];
}

export default useStateWithHistory;
