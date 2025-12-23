import NoSelectedBoard from "@/components/kanban/NoSelectedBoard";

export default function page() {
  return (
    <div className="h-full flex items-center justify-center bg-gray-100">
      <div className="w-full h-full flex items-center justify-center">
        <NoSelectedBoard />
      </div>
    </div>
  );
}
