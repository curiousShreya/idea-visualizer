"use client";

import { IdeaForm } from "@/components/IdeaForm";
import { IdeaList } from "@/components/IdeaList";
import { useIdeas } from "@/hooks/useIdeas";

export default function Home() {
  const { ideas, activeIdea, isLoaded, addIdea, deleteIdea, makeActive } =
    useIdeas();

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10 text-zinc-950 sm:px-6 lg:px-8 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Idea Visualizer
          </p>
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Capture ideas. Execute one at a time.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
              Keep every idea visible without letting the newest one interrupt
              what you are already doing.
            </p>
          </div>
        </header>

        <section
          className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          aria-label="Active idea"
        >
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Active Idea
          </p>
          {activeIdea ? (
            <div className="mt-3 space-y-2">
              <h2 className="break-words text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                {activeIdea.title}
              </h2>
              <p className="break-words text-base leading-7 text-zinc-600 dark:text-zinc-400">
                {activeIdea.description || "No description yet."}
              </p>
            </div>
          ) : (
            <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
              No active idea selected.
            </p>
          )}
        </section>

        <section className="space-y-5" aria-label="Ideas">
          <IdeaForm onAddIdea={addIdea} />
          <IdeaList
            ideas={ideas}
            isLoaded={isLoaded}
            onDeleteIdea={deleteIdea}
            onMakeActive={makeActive}
          />
        </section>
      </div>
    </main>
  );
}
