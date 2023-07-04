import { useEffect } from "react";
import { useStoreActions } from "../stores/store";

export default function useGameLoop() {
  const incrementFrameCount = useStoreActions(
    (actions) => actions.incrementFrameCount
  );
  useEffect(() => {
    const loop: FrameRequestCallback = () => {
      incrementFrameCount();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }, [incrementFrameCount]);
}
