import { Context } from "../types/context";
export interface Phase {
  id: number;
  title: string;
  tasks?: Task[];
  done?: boolean;
}

export interface Task {
  id: number;
  title: string;
  done: boolean;
  phaseId: Phase["id"];
}

export interface Db {
  phases: Phase[];
  tasks: Task[];
}

export const db: Db = {
  phases: [],
  tasks: [],
};

/**
 * Find Task by ID
 * @param ctx Context, graphql context
 * @param id number, task id
 * @returns Task
 */
export const findTask = (ctx: Context, id: number) => {
  const task = ctx.db.tasks.find((t: Task) => t.id === id);
  if (!task) throw "422 TASK NOT FOUND";
  return task;
};

/**
 * Find Previous Task
 * @param ctx context, graphql context
 * @param id number, task id
 * @returns Task
 */
export const previousTaskConfirmed = (ctx: Context, id: number): boolean => {
  if (id > 1) {
    return findTask(ctx, id - 1).done;
  }
  // First task should pass
  return true;
};

/**
 * Find Phase by id
 * @param ctx Context, graphql context
 * @param id number, phase id
 * @returns
 */
export const findPhase = (ctx: Context, id: number) => {
  const phase = ctx.db.phases.find((p: Phase) => p.id === id);
  if (!phase) throw "422 PHASE NOT FOUND";
  return phase;
};
