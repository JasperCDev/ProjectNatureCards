const cards = {
  "Basic Plant": {
    name: "Basic Plant",
    id: 1,
    power: 1,
    lifespan: 3,
  },
  "Great Oak": {
    name: "Great Oak",
    id: 2,
    power: 1,
    lifespan: 6,
  },
  "Purple Rose": {
    name: "Purple Rose",
    id: 3,
    power: 3,
    lifespan: 1,
  },
} as const;

export type Cards = typeof cards;
export type CardName = keyof Cards;
export type Card = Cards[CardName];

export default cards;
