//TYPES
import { Board } from "@/lib/types";

//STORES
import { useLocalState } from "@/lib/stores";

export default function BoardItemView({ id, label, total_columns }: Board) {
  const activeBoard = useLocalState((state) => state.ActiveBoard);
  const setActiveBoard = useLocalState((state) => state.SetActiveBoard);

  const is_active = activeBoard?.id === id;

  return (
    <button
      onClick={() => setActiveBoard(id)}
      className={`${
        is_active
          ? "activeboard"
          : "flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition hover:bg-muted"
      }`}
    >
      <span>{label}</span>
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
        {total_columns}
      </span>
    </button>
  );
}
