"use client";

import { useEffect, useState } from "react";
import type { Task } from "@/types/task";

const STORAGE_KEY = "idea-visualizer:tasks";

function normalizeTask(task: unknown): Task | null {
  if (
    typeof task !== "object" ||
    task === null ||
    !("id" in task) ||
    !("ideaId" in task) ||
    !("title" in task) ||
    !("completed" in task) ||
    !("createdAt" in task) ||
    typeof task.id !== "string" ||
    typeof task.ideaId !== "string" ||
    typeof task.title !== "string" ||
    typeof task.completed !== "boolean" ||
    typeof task.createdAt !== "string"
  ) {
    return null;
  }

  return {
    id: task.id,
    ideaId: task.ideaId,
    title: task.title,
    completed: task.completed,
    createdAt: task.createdAt,
  };
}

function readStoredTasks(): Task[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedTasks = window.localStorage.getItem(STORAGE_KEY);

    if (!storedTasks) {
      return [];
    }

    const parsedTasks: unknown = JSON.parse(storedTasks);

    if (!Array.isArray(parsedTasks)) {
      return [];
    }

    return parsedTasks
      .map((task) => normalizeTask(task))
      .filter((task): task is Task => task !== null);
  } catch {
    return [];
  }
}

function createTask(ideaId: string, title: string): Task {
  return {
    id: crypto.randomUUID(),
    ideaId,
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTasks(readStoredTasks());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, isLoaded]);

  function addTask(ideaId: string | null, title: string) {
    const trimmedTitle = title.trim();

    if (!ideaId || !trimmedTitle) {
      return;
    }

    setTasks((currentTasks) => [
      createTask(ideaId, trimmedTitle),
      ...currentTasks,
    ]);
  }

  function setTaskCompleted(id: string, completed: boolean) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== id) {
          return task;
        }

        return {
          ...task,
          completed,
        };
      }),
    );
  }

  return {
    tasks,
    isLoaded,
    addTask,
    setTaskCompleted,
  };
}
