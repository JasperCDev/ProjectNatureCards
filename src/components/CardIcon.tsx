import { Flower, LeafyGreen, TreePine } from "lucide-react";
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
  }
}
