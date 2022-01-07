import { useCallback, useState } from "react";

/**
 * Toogle items
 * @param defaultValue
 * @returns
 */
function useToggle(
  defaultValue: boolean
): [boolean, (val?: boolean | undefined) => void] {
  const [value, setValue] = useState(defaultValue);

  const toggleValue = useCallback((val?: boolean) => {
    setValue((currentValue) =>
      typeof val === "boolean" ? val : !currentValue
    );
  }, []);

  return [value, toggleValue];
}

export default useToggle;
