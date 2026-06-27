"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type IdeaFormProps = {
  onAddIdea: (title: string, description: string) => void;
};

export function IdeaForm({ onAddIdea }: IdeaFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onAddIdea(trimmedTitle, description);
    setTitle("");
    setDescription("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
    >
      <label htmlFor="idea-title" className="sr-only">
        Idea title
      </label>
      <input
        id="idea-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Capture a new idea"
        className="min-h-11 flex-1 rounded-md border border-zinc-200 bg-white px-3 text-base text-zinc-950 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-100"
      />
      <label htmlFor="idea-description" className="sr-only">
        Idea description
      </label>
      <textarea
        id="idea-description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Add a short description"
        rows={3}
        className="min-h-24 resize-y rounded-md border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-950 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-100"
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="min-h-11 rounded-md bg-zinc-950 px-5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400"
          disabled={!title.trim()}
        >
          Add idea
        </button>
      </div>
    </form>
  );
}
