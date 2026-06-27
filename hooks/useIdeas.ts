"use client";

import { useEffect, useState } from "react";
import type { Idea, IdeaStatus } from "@/types/idea";

const STORAGE_KEY = "idea-visualizer:ideas";
const IDEA_STATUSES: IdeaStatus[] = ["inbox", "active", "completed", "archived"];

function isIdeaStatus(status: unknown): status is IdeaStatus {
  return (
    typeof status === "string" &&
    IDEA_STATUSES.includes(status as IdeaStatus)
  );
}

function normalizeIdea(idea: unknown): Idea | null {
  if (
    typeof idea !== "object" ||
    idea === null ||
    !("id" in idea) ||
    !("title" in idea) ||
    !("createdAt" in idea) ||
    typeof idea.id !== "string" ||
    typeof idea.title !== "string" ||
    typeof idea.createdAt !== "string"
  ) {
    return null;
  }

  const description =
    "description" in idea && typeof idea.description === "string"
      ? idea.description
      : "";
  const status =
    "status" in idea && isIdeaStatus(idea.status) ? idea.status : "inbox";

  return {
    id: idea.id,
    title: idea.title,
    description,
    status,
    createdAt: idea.createdAt,
  };
}

function ensureSingleActiveIdea(ideas: Idea[]) {
  let hasActiveIdea = false;

  return ideas.map((idea) => {
    if (idea.status !== "active") {
      return idea;
    }

    if (!hasActiveIdea) {
      hasActiveIdea = true;
      return idea;
    }

    return {
      ...idea,
      status: "inbox" as const,
    };
  });
}

function readStoredIdeas(): Idea[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedIdeas = window.localStorage.getItem(STORAGE_KEY);

    if (!storedIdeas) {
      return [];
    }

    const parsedIdeas: unknown = JSON.parse(storedIdeas);

    if (!Array.isArray(parsedIdeas)) {
      return [];
    }

    return ensureSingleActiveIdea(
      parsedIdeas
        .map((idea) => normalizeIdea(idea))
        .filter((idea): idea is Idea => idea !== null),
    );
  } catch {
    return [];
  }
}

function createIdea(title: string, description: string): Idea {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    status: "inbox",
    createdAt: new Date().toISOString(),
  };
}

export function useIdeas() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIdeas(readStoredIdeas());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
  }, [ideas, isLoaded]);

  const activeIdea = ideas.find((idea) => idea.status === "active") ?? null;

  function addIdea(title: string, description: string) {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      return;
    }

    setIdeas((currentIdeas) => [
      createIdea(trimmedTitle, trimmedDescription),
      ...currentIdeas,
    ]);
  }

  function deleteIdea(id: string) {
    setIdeas((currentIdeas) => currentIdeas.filter((idea) => idea.id !== id));
  }

  function makeActive(id: string) {
    setIdeas((currentIdeas) => {
      if (!currentIdeas.some((idea) => idea.id === id)) {
        return currentIdeas;
      }

      return currentIdeas.map((idea) => {
        if (idea.id === id) {
          return {
            ...idea,
            status: "active",
          };
        }

        if (idea.status === "active") {
          return {
            ...idea,
            status: "inbox",
          };
        }

        return idea;
      });
    });
  }

  return {
    ideas,
    activeIdea,
    isLoaded,
    addIdea,
    deleteIdea,
    makeActive,
  };
}
