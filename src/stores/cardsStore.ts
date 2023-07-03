import { createStore, State } from "easy-peasy";
import cards, { CardName } from "../cards";

type CardsState = {
  latestCardId: number;
  cards: Array<{
    id: number;
    tileId: string;
    card: CardName;
    power: number;
    health: number;
  }>;
};

export type StoreState = State<CardsState>;

export const model = {
  latestCardId: 3,
  cards: [
    {
      id: 1,
      tileId: "00",
      card: "Basic Plant" as const,
      power: cards["Basic Plant"].power,
      health: cards["Basic Plant"].lifespan,
    },
    {
      id: 2,
      tileId: "11",
      card: "Great Oak" as const,
      power: cards["Great Oak"].power,
      health: cards["Great Oak"].lifespan,
    },
    {
      id: 2,
      tileId: "22",
      card: "Purple Rose" as const,
      power: cards["Purple Rose"].power,
      health: cards["Purple Rose"].lifespan,
    },
  ],
};

const cardsStore = createStore<StoreState>(model);

export default cardsStore;
