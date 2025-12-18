import React from "react";
import Header from "@/components/kanban/Header";
import SideBar from "@/components/kanban/SideBar";

export default function KanbanBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <main className="flex flex-1 overflow-hidden max-w-340 mx-auto w-full">
        <SideBar />
        <section className="flex-1 overflow-y-auto bg-muted/10 px-4 py-6">
          {children}
        </section>
      </main>
    </div>
  );
}
