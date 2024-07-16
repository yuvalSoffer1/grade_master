import { useDisplayContext } from "../context/DisplayContext";
import { DisplayType } from "../models/DisplayType";

export const useDisplay = () => {
  const { displayDispatch } = useDisplayContext();

  const displayManager = (display: DisplayType) => {
    displayDispatch({ type: display });
  };
  return { displayManager };
};
