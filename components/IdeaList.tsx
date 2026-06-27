"use client";

import type { Idea } from "@/types/idea";

type IdeaListProps = {
  ideas: Idea[];
  isLoaded: boolean;
  onDeleteIdea: (id: string) => void;
  onMakeActive: (id: string) => void;
};

function formatCreatedAt(createdAt: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(createdAt));
}

export function IdeaList({
  ideas,
  isLoaded,
  onDeleteIdea,
  onMakeActive,
}: IdeaListProps) {
  if (!isLoaded) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        Loading ideas...
      </p>
    );
  }

  if (ideas.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        No ideas yet. Add one when it shows up.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {ideas.map((idea) => (
        <li
          key={idea.id}
          className="flex items-start justify-between gap-4 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="break-words text-base font-medium text-zinc-950 dark:text-zinc-50">
                {idea.title}
              </p>
              <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium capitalize text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                {idea.status}
              </span>
            </div>
            {idea.description ? (
              <p className="mt-2 break-words text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {idea.description}
              </p>
            ) : null}
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {formatCreatedAt(idea.createdAt)}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => onMakeActive(idea.id)}
              disabled={idea.status === "active"}
              className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:disabled:bg-zinc-900 dark:disabled:text-zinc-600"
            >
              Make Active
            </button>
            <button
              type="button"
              onClick={() => onDeleteIdea(idea.id)}
              className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-red-900/70 dark:hover:bg-red-950/40 dark:hover:text-red-300"
              aria-label={`Delete idea: ${idea.title}`}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
