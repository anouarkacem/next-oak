import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const Task = objectType({
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
