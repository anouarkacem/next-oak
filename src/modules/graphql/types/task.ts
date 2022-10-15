import { extendType, objectType } from "nexus";

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
