import { previousTask, Task } from "@modules/db";
import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const TaskType = objectType({
  name: "Task",
  definition(t) {
    t.nonNull.int("id", {
      description: "Unique Task ID",
    });
    t.nonNull.string("title", {
      description: "Task title/name",
    });
    t.nonNull.boolean("done", {
      description: "Task Status, DONE:true, NOT DONE: false",
    });
    t.nonNull.int("phaseId", {
      description: "Phase ID where Task in assigned to",
    });
  },
});

// QUERIES

/**
 * Get Task Query
 * @returns Task[]
 */
export const getTasks = extendType({
  type: "Query",
  definition(t) {
    t.list.field("tasks", {
      type: "Task",
      resolve: (_, args, ctx) => {
        return ctx.db.tasks;
      },
    });
  },
});

// MUTATIONS

/**
 * Create Task Mutation
 * @param phaseId number
 * @param title string
 * @return Task
 */
export const createTask = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createTask", {
      type: "Task",
      args: {
        phaseId: nonNull(intArg())!,
        title: nonNull(stringArg())!,
      },
      resolve: (_, args, ctx) => {
        const id: number = ctx.db.tasks.length + 1;
        const task = {
          id,
          title: args.title,
          phaseId: args.phaseId,
          done: false,
        };
        ctx.db.tasks.push(task);
        return task;
      },
    });
  },
});

/**
 * Confirm Task Mutation
 * @param id number, task id
 * @return Task[]
 */
export const confirmTask = extendType({
  type: "Mutation",
  definition(t) {
    t.list.field("confirmTask", {
      type: "Task",
      args: { id: nonNull(intArg()) },
      resolve(_, args, ctx) {
        return ctx.db.tasks.map((t: Task) => {
          if (t.id === args.id) {
            if (previousTask(ctx, args.id)?.done !== true)
              // TODO: Handle Errors
              throw "CANNOT CONFIRM TASK, PREVIOUS STEP MUST BE MARKED AS DONE";
            t.done = true;
            return t;
          }
          return t;
        });
      },
    });
  },
});

/**
 * Undo Task Mutation
 * @param id number, task id
 * @return Task[]
 */
export const undoTask = extendType({
  type: "Mutation",
  definition(t) {
    t.list.field("undoTask", {
      type: "Task",
      args: {
        id: nonNull(intArg())!,
      },
      resolve(_, args, ctx) {
        // Since one task in the middle of the phase is undone
        // All next tasks should be done for verification purposes
        // TODO: Use Authentication (JWT) to undo a task
        return ctx.db.tasks.map((t: Task) => {
          if (t.id >= args.id) {
            t.done = false;
            return t;
          }
          return t;
        });
      },
    });
  },
});
