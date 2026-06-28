"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { Task } from "@/types/task";

type TaskBreakdownProps = {
  activeIdeaId: string | null;
  tasks: Task[];
  isLoaded: boolean;
  onAddTask: (ideaId: string | null, title: string) => void;
  onSetTaskCompleted: (id: string, completed: boolean) => void;
};

function formatCreatedAt(createdAt: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(createdAt));
}

export function TaskBreakdown({
  activeIdeaId,
  tasks,
  isLoaded,
  onAddTask,
  onSetTaskCompleted,
}: TaskBreakdownProps) {
  const [title, setTitle] = useState("");
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const percentComplete =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const canAddTask = Boolean(activeIdeaId && title.trim());

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canAddTask) {
      return;
    }

    onAddTask(activeIdeaId, title);
    setTitle("");
  }

  return (
    <div className="mt-6 border-t border-zinc-200 pt-5 dark:border-zinc-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            Task Breakdown
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {completedTasks} of {totalTasks} tasks complete ({percentComplete}%)
          </p>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 sm:w-44 dark:bg-zinc-900"
          aria-label={`${percentComplete}% complete`}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentComplete}
        >
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="task-title" className="sr-only">
          Task title
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder={
            activeIdeaId
              ? "Add a task for the active idea"
              : "Select an active idea to add tasks"
          }
          disabled={!activeIdeaId}
          className="min-h-11 flex-1 rounded-md border border-zinc-200 bg-white px-3 text-base text-zinc-950 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-100 dark:disabled:bg-zinc-900 dark:disabled:text-zinc-600"
        />
        <button
          type="submit"
          disabled={!canAddTask}
          className="min-h-11 rounded-md bg-zinc-950 px-5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400"
        >
          Add Task
        </button>
      </form>

      {!isLoaded ? (
        <p className="mt-4 rounded-lg border border-dashed border-zinc-300 p-4 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          Loading tasks...
        </p>
      ) : tasks.length === 0 ? (
        <p className="mt-4 rounded-lg border border-dashed border-zinc-300 p-4 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          No tasks yet.
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-start justify-between gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-black"
            >
              <div className="min-w-0">
                <p
                  className={`break-words text-sm font-medium ${
                    task.completed
                      ? "text-zinc-500 line-through dark:text-zinc-500"
                      : "text-zinc-950 dark:text-zinc-50"
                  }`}
                >
                  {task.title}
                </p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {formatCreatedAt(task.createdAt)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSetTaskCompleted(task.id, !task.completed)}
                className="shrink-0 rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-emerald-900/70 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
              >
                {task.completed ? "Mark incomplete" : "Mark complete"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
