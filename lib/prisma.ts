// Disable TypeScript to avoid troubles with `global.` and avoid vscode import troubles
// @ts-nocheck

import { PrismaClient } from "@prisma/client";

export const prisma: PrismaClient =
  global.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export type Status = "NotStarted" | "InProgress" | "Completed";

export type Workspace = {
  id?: string;
  title: string;
  description: string;
};

export type Kanban = {
  id?: string;
  title: string;
  description: string;
  status: Status;
  workspaceId: string;
};

export type Task = {
  id?: string;
  title: string;
  description: string;
  status: Status;
  kanbanId: string;
};

export type ModelWorkspaceProps = {
  workspaces: Workspace[];
  editWorkspace: (id: string, title: string, description: string) => void;
  deleteWorkspace: (id: string) => void;
};

export type ModelKanbanProps = {
  kanbans: Kanban[];
  editKanban: (id: string, title: string, description: string) => void;
  deleteKanban: (id: string) => void;
  workspaceId: string;
};

export type ModelTaskProps = {
  tasks: Task[];
  editTask: (id: string, title: string, description: string) => void;
  deleteTask: (id: string) => void;
};

export type ModelWorkspaceHeaderProps = {
  submitWorkspace: (title: string, description: string) => void;
};

export type ModelKanbanHeaderProps = {
  submitKanban: (title: string, description: string) => void;
};

export type ModelTaskHeaderProps = {
  submitTask: (title: string, description: string) => void;
};
