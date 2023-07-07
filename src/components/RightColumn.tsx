import { Sword } from "lucide-react";
import { useStoreActions, useStoreState } from "../stores/store";
import CardsInHand from "./CardsInHand";

export default function RightColumn() {
  const playerAction = useStoreState((state) => state.playerAction);
  const updatePlayerAction = useStoreActions(
    (actions) => actions.updatePlayerAction
  );

  function handleSwordClick() {
    updatePlayerAction(playerAction === "killing card" ? null : "killing card");
  }

  return (
    <div style={{ width: "100%" }}>
      <CardsInHand />
      <Sword
        size={playerAction === "killing card" ? 56 : 48}
        style={{
          fill: playerAction === "killing card" ? "red" : "grey",
          border:
            playerAction === "killing card" ? "3px solid crimson" : "none",
        }}
        onClick={handleSwordClick}
      />
    </div>
  );
}
