import { Badge } from "../ui/badge";
import { Color } from "@/lib/types";

//PROPS
interface Props {
  color: Color;
  label: string;
}

export default function ColoredBadge({ color, label }: Props) {
  return <Badge variant={color}>{label}</Badge>;
}
