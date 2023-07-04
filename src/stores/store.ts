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
import CardsInHand from "../components/CardsInHand";
import cards, { CardName } from "../utils/cards";

const partsOfDay = ["morning", "noon", "afternoon", "midnight"] as const;

export type CellData = {
  id: string;
  card: StoreState["cardsInPlay"][number] | null;
};
export type CellRow = CellData[];
export type GridData = CellRow[];

export type Card = {
  id: number;
  name: CardName;
  power: number;
  health: number;
};

export type CardInPlay = Card & { tileId: string };
export type CardsInPlay = CardInPlay[];
export type CardInHand = Card;
export type CardsInHand = CardInHand[];

export type Model = {
  latestCardId: number;
  gridData: Computed<Model, GridData>;
  cardsInPlay: CardsInPlay;
  cardsInHand: CardsInHand;
  cardSelected: CardsInHand[number]["id"] | null;
  selectCard: Action<Model, CardsInHand[number]["id"]>;
  placeCard: Action<
    Model,
    { cardId: CardsInHand[number]["id"]; cellId: CellData["id"] }
  >;
  gridSize: number;
  partOfDay: (typeof partsOfDay)[number];
  playerCurrency: number;
  updateCurrency: Action<Model, number>;
  frameCount: number;
  incrementFrameCount: Action<Model>;
  endTurn: Action<Model>;
  addRandomCard: Action<Model>;
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
        const card = state.cardsInPlay.find((c) => c.tileId == id);
        row.push({
          id,
          card: card || null,
        });
      }
      data.push(row);
    }
    return data;
  }),
  cardsInPlay: [
    {
      id: 1,
      tileId: "00",
      name: "Basic Plant" as const,
      power: cards["Basic Plant"].power,
      health: cards["Basic Plant"].lifespan,
    },
    {
      id: 2,
      tileId: "11",
      name: "Great Oak" as const,
      power: cards["Great Oak"].power,
      health: cards["Great Oak"].lifespan,
    },
    {
      id: 3,
      tileId: "22",
      name: "Purple Rose" as const,
      power: cards["Purple Rose"].power,
      health: cards["Purple Rose"].lifespan,
    },
  ],
  cardsInHand: [],
  cardSelected: null,
  selectCard: action((state, cardId) => {
    state.cardSelected = cardId;
  }),
  placeCard: action((state, payload) => {
    let cardIndx = -1;
    const card = state.cardsInHand.find((card, indx) => {
      const found = card.id === payload.cardId;
      if (found) {
        cardIndx = indx;
      }
      return found;
    });
    if (typeof card === "undefined") throw Error("CARD ID DOES NOT EXIST");
    state.cardsInHand.splice(cardIndx, 1);
    state.cardSelected = null;
    const playedCard: CardInPlay = {
      ...card,
      tileId: payload.cellId,
    };
    state.cardsInPlay.push(playedCard);
  }),
  partOfDay: "morning" as const,
  playerCurrency: 0,
  updateCurrency: action((state, payload) => {
    state.playerCurrency = state.playerCurrency + payload;
  }),
  frameCount: 0,
  incrementFrameCount: action((state) => {
    state.frameCount++;
  }),
  addRandomCard: action((state) => {
    const randomCardIndx = Math.floor(Math.random() * 3);
    const cardNames = ["Basic Plant", "Purple Rose", "Great Oak"] as const;
    const randomCardName = cardNames[randomCardIndx];
    const randomCard = cards[randomCardName];
    const formattedCard = {
      id: state.latestCardId + 1,
      name: randomCard.name,
      health: randomCard.lifespan,
      power: randomCard.power,
    };
    state.cardsInHand.push(formattedCard);
  }),
  endTurn: action((state) => {
    const partOfDayIndx = partsOfDay.indexOf(state.partOfDay);
    const newIndx =
      partOfDayIndx === partsOfDay.length - 1 ? 0 : partOfDayIndx + 1;
    state.partOfDay = partsOfDay[newIndx];

    const damagedCards = state.cardsInPlay.map((card) => {
      state.playerCurrency += card.power;
      return {
        ...card,
        health: card.health - 1,
      };
    });
    const aliveCards = damagedCards.filter((card) => {
      return card.health > 0;
    });

    state.cardsInPlay = aliveCards;
  }),
};

const cardsStore = createStore(model);

export default cardsStore;
