import { Flower, LeafyGreen, TreePine } from "lucide-react";
import cards from "../cards";

type Props = {
  name: (typeof cards)[number]["name"];
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
      return <Flower {...sharedProps} color="pink" />;
  }
}
