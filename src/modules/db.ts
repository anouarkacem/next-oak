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
 *
 * @param ctx context, graphql context
 * @param id number, task id
 * @returns Task
 */
export const previousTask = (ctx: Context, id: number) => {
  if (id > 1) {
    return findTask(ctx, id - 1);
  }
};
