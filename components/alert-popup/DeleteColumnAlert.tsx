import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Delete01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";

//STORES
import { useLocalState } from "@/lib/stores";
import { Id } from "@/lib/types";

//PROPS
interface Props {
  column_id: Id;
  column_label: string;
}

export default function DeleteAlert({ column_id, column_label }: Props) {
  //states
  const deleteColumn = useLocalState((state) => state.DeleteColumn);

  function onDelete(id: Id) {
    deleteColumn(id);
    toast.success(`Column ${column_label} has been deleted!`);
  }

  const confirmation: string = `Delete ${column_label.toUpperCase()} column?`;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon-sm" variant="ghost">
          <HugeiconsIcon icon={Delete01Icon} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmation}</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete this column along
            with its items.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onDelete(column_id)}
            variant="destructive"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
