import BoardListView from "../general/BoardListView";

export default function SideBar() {
  return (
    <aside className="flex w-[280px] min-w-[260px] flex-col border-r border-dashed bg-white py-6 px-4">
      <BoardListView />
    </aside>
  );
}
