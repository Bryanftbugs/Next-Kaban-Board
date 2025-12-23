export default function NoSelectedBoard() {
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="max-w-xl w-full rounded-2xl border border-dashed border-gray-200 bg-linear-to-br from-slate-50 via-white to-slate-100/80 px-6 py-8 shadow-sm dark:border-slate-700 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900/60">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
            <span className="text-2xl">👋</span>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">
              Welcome to your Kanban
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-600 dark:text-slate-50">
              Select a board from the left
            </h2>
          </div>

          <p className="text-sm md:text-base leading-relaxed text-slate-500 dark:text-slate-400">
            Choose one of your existing boards to continue where you left off,
            or create a new board tailored to your workflow. Use boards to group
            tasks, track progress, and keep everything moving smoothly.
          </p>

          <div className="mt-2 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-slate-100/80 px-4 py-2 text-[11px] font-medium text-slate-500 dark:bg-slate-800/70 dark:text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>Tip: You can switch boards anytime from the sidebar.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
