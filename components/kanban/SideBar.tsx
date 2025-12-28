import BoardListView from "../general/BoardListView";

export default function SideBar() {
  return (
    <aside className="flex w-[280px] min-w-[260px] flex-col border-r border-dashed py-6 bg-white">
      <BoardListView />
    </aside>
  );
}
