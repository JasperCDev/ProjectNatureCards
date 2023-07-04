import {
  Action,
  action,
  Actions,
  Computed,
  computed,
  createStore,
  createTypedHooks,
  State,
} from "easy-peasy";
import cards, { CardName } from "../utils/cards";

const partsOfDay = ["morning", "noon", "afternoon", "midnight"] as const;

type CellData = { id: string; card: StoreState["cards"][number] | null };
type CellRow = CellData[];
type GridData = CellRow[];

type Model = {
  latestCardId: number;
  gridData: Computed<Model, GridData>;
  cards: Array<{
    id: number;
    tileId: string;
    card: CardName;
    power: number;
    health: number;
  }>;
  gridSize: number;
  partOfDay: (typeof partsOfDay)[number];
  playerCurrency: number;
  updateCurrency: Action<Model, number>;
  frameCount: number;
  incrementFrameCount: Action<Model>;
  endTurn: Action<Model>;
};

export type StoreState = State<Model>;
export type StoreActions = Actions<Model>;

export const { useStore, useStoreActions, useStoreState } =
  createTypedHooks<Model>();

export const model: Model = {
  latestCardId: 3,
  gridSize: 3,
  gridData: computed((state) => {
    const data: GridData = [];
    for (let i = 0; i < state.gridSize; i++) {
      const row: CellRow = [];
      for (let j = 0; j < state.gridSize; j++) {
        const id = `${i}${j}`;
        const card = state.cards.find((c) => c.tileId == id);
        row.push({
          id,
          card: card || null,
        });
      }
      data.push(row);
    }
    return data;
  }),
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
      id: 3,
      tileId: "22",
      card: "Purple Rose" as const,
      power: cards["Purple Rose"].power,
      health: cards["Purple Rose"].lifespan,
    },
  ],
  partOfDay: "morning" as const,
  playerCurrency: 0,
  updateCurrency: action((state, payload) => {
    state.playerCurrency = state.playerCurrency + payload;
  }),
  frameCount: 0,
  incrementFrameCount: action((state) => {
    state.frameCount++;
  }),
  endTurn: action((state) => {
    const partOfDayIndx = partsOfDay.indexOf(state.partOfDay);
    const newIndx =
      partOfDayIndx === partsOfDay.length - 1 ? 0 : partOfDayIndx + 1;
    state.partOfDay = partsOfDay[newIndx];

    const damagedCards = state.cards.map((card) => {
      state.playerCurrency += card.power;
      return {
        ...card,
        health: card.health - 1,
      };
    });
    const aliveCards = damagedCards.filter((card) => {
      return card.health > 0;
    });

    state.cards = aliveCards;
  }),
};

const cardsStore = createStore(model);

export default cardsStore;
