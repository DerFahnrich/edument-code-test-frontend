import { RefObject, useState } from "react";

import useEventListener from "./useEventListener";

interface IUseContextMenuReturnType {
  xPos: string;
  yPos: string;
  showMenu: boolean;
  closeMenu: () => void;
}

function useContextMenu<T extends HTMLElement = HTMLElement>(
  element: RefObject<T>,
  callback?: () => void
): IUseContextMenuReturnType {
  const [xPos, setXPos] = useState("0px");
  const [yPos, setYPos] = useState("0px");
  const [showMenu, setShowMenu] = useState(false);

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLElement;
    const parent = target.parentElement;
    const classList = parent?.classList;

    if (classList?.contains("folder") || classList?.contains("file")) {
      setXPos(`${e.pageX}px`);
      setYPos(`${e.pageY}px`);
      setShowMenu(true);
    }

    if (callback) {
      callback();
    }
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEventListener(
    "contextmenu",
    (event) => {
      handleContextMenu(event as unknown as MouseEvent);
    },
    element
  );

  return { xPos, yPos, showMenu, closeMenu };
}

export default useContextMenu;
