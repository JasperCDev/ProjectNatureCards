import {
  Droplet,
  Flame,
  Flower,
  LeafyGreen,
  Shrub,
  Sprout,
  TreePine,
} from "lucide-react";
import { CardName } from "../utils/cards";

type Props = {
  name: CardName;
};

const sharedProps = {
  size: 48,
};

export default function CardIcon({ name }: Props) {
  switch (name) {
    case "Basic Plant":
      return <LeafyGreen {...sharedProps} color="green" />;
    case "Great Oak":
      return <TreePine {...sharedProps} color="green" />;
    case "Purple Rose":
      return <Flower {...sharedProps} color="purple" />;
    case "Sprinkler":
      return <Droplet {...sharedProps} color="lightblue" />;
    case "Berry Bush":
      return <Shrub {...sharedProps} color="green" />;
    case "Sapling":
      return <Sprout {...sharedProps} color="chocolate" />;
    case "Eternal Flame":
      return <Flame {...sharedProps} color="red" />;
  }
}
