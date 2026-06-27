export type IdeaStatus = "inbox" | "active" | "completed" | "archived";

export type Idea = {
  id: string;
  title: string;
  description: string;
  status: IdeaStatus;
  createdAt: string;
};
