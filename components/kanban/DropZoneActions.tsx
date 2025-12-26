//TYPES
import { Id } from "@/lib/types";

//PROPS
interface Props {
  board_id: Id;
}

//COMPONENTS
import AddNewColumnDialog from "../popup/AddNewColumnDialog";

export default function DropZoneActions({ board_id }: Props) {
  return (
    <div className="flex items-center gap-2">
      <AddNewColumnDialog boardId={board_id} />
    </div>
  );
}
