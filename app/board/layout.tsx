import React from "react";
import Header from "@/components/kanban/Header";
import SideBar from "@/components/kanban/SideBar";

export default function KanbanBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col bg-gray-100">
      <Header />
      <main className="flex flex-1 overflow-hidden w-full">
        <SideBar />
        <section className="flex-1 overflow-y-auto">{children}</section>
      </main>
    </div>
  );
}
