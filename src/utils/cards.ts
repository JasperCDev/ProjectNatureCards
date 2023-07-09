const cards = {
  "Basic Plant": {
    name: "Basic Plant",
    id: 1,
    power: 1,
    lifespan: 6,
    type: "plant",
    ability: null,
    price: 3,
  },
  "Berry Bush": {
    name: "Berry Bush",
    id: 2,
    power: 3,
    lifespan: 3,
    type: "plant",
    ability: null,
    price: 5,
  },
  "Purple Rose": {
    name: "Purple Rose",
    id: 3,
    power: 6,
    lifespan: 1,
    type: "plant",
    ability: null,
    price: 5,
  },
  Sprinkler: {
    name: "Sprinkler",
    id: 4,
    power: -1,
    lifespan: -1,
    type: "building",
    ability: "sprinkler",
    price: 10,
  },
  Sapling: {
    name: "Sapling",
    id: 5,
    power: -1,
    lifespan: -1,
    type: "plant",
    ability: "growth",
    price: 10,
  },
  "Great Oak": {
    name: "Great Oak",
    id: 6,
    power: 2,
    type: "plant",
    lifespan: 25,
    ability: null,
    price: -1,
  },
  "Eternal Flame": {
    name: "Eternal Flame",
    id: 7,
    power: -1,
    type: "building",
    lifespan: -1,
    ability: "fire",
    price: 10,
  },
} as const;

export type Cards = typeof cards;
export type CardName = keyof Cards;
export type CardAbility = Cards[CardName]["ability"];
export type Card = Cards[CardName];

export default cards;
