const cards = {
  "Basic Plant": {
    name: "Basic Plant",
    id: 1,
    power: 1,
    lifespan: 6,
    type: "plant",
    ability: null,
    purchasable: true,
  },
  "Berry Bush": {
    name: "Berry Bush",
    id: 2,
    power: 3,
    lifespan: 3,
    type: "plant",
    ability: null,
    purchasable: true,
  },
  "Purple Rose": {
    name: "Purple Rose",
    id: 3,
    power: 6,
    lifespan: 1,
    type: "plant",
    ability: null,
    purchasable: true,
  },
  Sprinkler: {
    name: "Sprinkler",
    id: 4,
    power: -1,
    lifespan: 3,
    type: "building",
    ability: "sprinkler",
    purchasable: true,
  },
  Sapling: {
    name: "Sapling",
    id: 5,
    power: -1,
    lifespan: -1,
    type: "plant",
    ability: "growth",
    purchasable: true,
  },
  "Great Oak": {
    name: "Great Oak",
    id: 6,
    power: 2,
    type: "plant",
    lifespan: 10,
    ability: null,
    purchasable: false,
  },
  "Eternal Flame": {
    name: "Eternal Flame",
    id: 7,
    power: -1,
    type: "building",
    lifespan: 3,
    ability: "fire",
    purchasable: true,
  },
} as const;

export type Cards = typeof cards;
export type CardName = keyof Cards;
export type CardAbility = Cards[CardName]["ability"];
export type Card = Cards[CardName];

export default cards;
