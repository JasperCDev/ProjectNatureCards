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
import cards, { CardAbility, CardName } from "../utils/cards";

const partsOfDay = ["morning", "noon", "afternoon", "midnight"] as const;

export type CellData = {
  id: string;
  card: StoreState["cardsInPlay"][number] | null;
  effects: Array<CardAbility>;
};
export type CellRow = CellData[];
export type GridData = CellRow[];

export type Card = {
  id: number;
  name: CardName;
  power: number;
  health: number;
  ability: CardAbility;
  turnCount: number;
  boughtFor: number;
};

export type CardInPlay = Card & { tileId: string };
export type CardsInPlay = CardInPlay[];
export type CardInHand = Card;
export type CardsInHand = CardInHand[];

export type PlayerAction = "placing card" | "killing card" | null;

export type Model = {
  gameOver: boolean;
  dayCount: number;
  turnCount: number;
  rent: Computed<Model, number>;
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
  cardsPurchased: number;
  buildingsPurchased: number;
  plantsPurchased: number;
  playerAction: PlayerAction;
  updatePlayerAction: Action<Model, PlayerAction>;
  killCard: Action<Model, CardsInPlay[number]["id"]>;
  gridSize: number;
  partOfDay: (typeof partsOfDay)[number];
  playerCurrency: number;
  updateCurrency: Action<Model, number>;
  frameCount: number;
  incrementFrameCount: Action<Model>;
  endTurn: Action<Model>;
  buyCard: Action<Model, { card: (typeof cards)[CardName]; price: number }>;
};

export type StoreState = State<Model>;
export type StoreActions = Actions<Model>;

export const { useStore, useStoreActions, useStoreState } =
  createTypedHooks<Model>();

export const model: Model = {
  gameOver: false,
  rent: computed((state) => Math.floor(2 * 1.1 ** state.turnCount)),
  turnCount: 0,
  dayCount: 1,
  latestCardId: 1,
  gridSize: 5,
  cardsPurchased: 0,
  plantsPurchased: 0,
  buildingsPurchased: 0,
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
          effects: [],
        });
      }
      data.push(row);
    }
    state.cardsInPlay.forEach((card) => {
      const ability = card?.ability;
      function getGridTile(i1: number, i2: number) {
        const row = data[i1];
        if (typeof row === "undefined") {
          return null;
        }
        const cell = row[i2];
        if (typeof cell === "undefined") {
          return null;
        }
        return cell;
      }
      if (!ability) {
        return;
      }
      const [i, j] = card.tileId.split("").map((v) => Number(v));
      const adjacentCards = {
        above: getGridTile(i - 1, j),
        below: getGridTile(i + 1, j),
        left: getGridTile(i, j - 1),
        right: getGridTile(i, j + 1),
      };
      if (adjacentCards.above) {
        adjacentCards.above.effects.push(ability);
      }
      if (adjacentCards.below) {
        adjacentCards.below.effects.push(ability);
      }
      if (adjacentCards.left) {
        adjacentCards.left.effects.push(ability);
      }
      if (adjacentCards.right) {
        adjacentCards.right.effects.push(ability);
      }
    });

    return data;
  }),
  cardsInPlay: [],
  cardsInHand: [
    {
      id: 1,
      name: "Great Oak",
      health: cards["Great Oak"].lifespan,
      power: cards["Great Oak"].power,
      ability: null,
      boughtFor: 0,
      turnCount: 0,
    },
  ],
  cardSelected: null,
  selectCard: action((state, cardId) => {
    state.playerAction = "placing card";
    state.cardSelected = cardId;
  }),
  playerAction: null,
  updatePlayerAction: action((state, playerAction) => {
    state.playerAction = playerAction;
  }),
  killCard: action((state, cardId) => {
    let cardIndx = -1;
    const card = state.cardsInPlay.find((card, indx) => {
      const found = card.id === cardId;
      if (found) {
        cardIndx = indx;
      }
      return found;
    });
    if (!card) throw Error();
    state.cardsInPlay.splice(cardIndx, 1);
    state.playerCurrency += Math.floor(card.boughtFor / 2);
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
    if (state.cardsInHand.length > 0) {
      state.cardSelected = state.cardsInHand[0].id;
    }
  }),
  partOfDay: "morning" as const,
  playerCurrency: 10,
  updateCurrency: action((state, payload) => {
    state.playerCurrency = state.playerCurrency + payload;
  }),
  frameCount: 0,
  incrementFrameCount: action((state) => {
    state.frameCount++;
  }),
  buyCard: action((state, { card, price }) => {
    state.playerCurrency -= price;
    const newCard = {
      id: state.latestCardId + 1,
      name: card.name,
      health: card.lifespan,
      power: card.power,
      ability: card.ability,
      turnCount: 0,
      boughtFor: price,
    };
    if (card.type === "plant") {
      state.plantsPurchased++;
    }
    if (card.type === "building") {
      state.buildingsPurchased++;
    }
    state.cardsPurchased++;
    state.latestCardId++;
    state.cardsInHand.push(newCard);
    state.cardSelected = newCard.id;
    state.playerAction = "placing card";
  }),
  endTurn: action((state) => {
    state.turnCount++;
    if (state.partOfDay === "midnight") {
      state.dayCount++;
    }
    const partOfDayIndx = partsOfDay.indexOf(state.partOfDay);
    const newIndx =
      partOfDayIndx === partsOfDay.length - 1 ? 0 : partOfDayIndx + 1;
    state.partOfDay = partsOfDay[newIndx];

    const damagedCards = state.cardsInPlay.map((card) => {
      const [i, j] = card.tileId.split("").map((v) => Number(v));
      const cell = state.gridData[i][j];
      if (card.power !== -1) {
        const power = cell.effects.includes("fire")
          ? card.power * 2
          : card.power;
        state.playerCurrency += power;
      }

      const adjustedCard = {
        ...card,
        turnCount: card.turnCount + 1,
      };

      if (adjustedCard.ability === "growth" && adjustedCard.turnCount === 10) {
        adjustedCard.ability = null;
        adjustedCard.health = cards["Great Oak"].lifespan;
        adjustedCard.name = cards["Great Oak"].name;
        adjustedCard.power = cards["Great Oak"].power;
      }

      if (adjustedCard.health === -1) {
        return adjustedCard;
      }
      if (!cell.effects.includes("sprinkler")) {
        adjustedCard.health -= 1;
      }

      return adjustedCard;
    });
    const aliveCards = damagedCards.filter((card) => {
      if (card.health === -1) {
        return true;
      }
      return card.health > 0;
    });

    state.cardsInPlay = aliveCards;
    state.playerCurrency = Math.max(state.playerCurrency - state.rent, 0);
    if (state.playerCurrency === 0) {
      state.gameOver = true;
    }
  }),
};

const cardsStore = createStore(model);

export default cardsStore;
