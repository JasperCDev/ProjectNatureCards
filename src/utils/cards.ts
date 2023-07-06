const cards = {
  "Basic Plant": {
    name: "Basic Plant",
    id: 1,
    power: 1,
    lifespan: 3,
    type: "plant",
    ability: null,
    price: 3,
  },
  "Great Oak": {
    name: "Great Oak",
    id: 2,
    power: 1,
    lifespan: 6,
    type: "plant",
    ability: null,
    price: 5,
  },
  "Purple Rose": {
    name: "Purple Rose",
    id: 3,
    power: 3,
    lifespan: 1,
    type: "plant",
    ability: null,
    price: 5,
  },
  Sprinkler: {
    name: "Sprinkler",
    id: 4,
    power: 0,
    lifespan: 3,
    type: "building",
    ability: "sprinkler",
    price: 10,
  },
} as const;

export type Cards = typeof cards;
export type CardName = keyof Cards;
export type CardAbility = Cards[CardName]["ability"];
export type Card = Cards[CardName];

export default cards;
