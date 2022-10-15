import { Task } from "@modules/db";
import { extendType, nonNull, objectType, stringArg } from "nexus";

export const Phase = objectType({
  name: "Phase",
  definition(t) {
    t.nonNull.int("id", {
      description: "Unique Phase ID",
    });
    t.nonNull.string("title", {
      description: "Phase title/name",
    });
    t.boolean("done", {
      description: "Phase status: ACHIEVED:true, NOT ACHIEVED:false",
    });
    t.list.field("tasks", {
      type: "Task",
      resolve: (_, args, ctx) => {
        return ctx.db.tasks.filter((t: Task) => t.phaseId === _.id);
      },
    });
  },
});

// QUERIES
export const getPhases = extendType({
  type: "Query",
  definition(t) {
    t.list.field("phases", {
      type: "Phase",
      resolve: (_, args, ctx) => {
        return ctx.db.phases;
      },
    });
  },
});

// MUTATIONS

export const createPhase = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createPhase", {
      type: "Phase",
      args: {
        title: nonNull(stringArg())!,
      },
      resolve: (_, args, ctx) => {
        const id: number = ctx.db.phases.length + 1;
        const phase = {
          id,
          title: args.title,
        };
        ctx.db.phases.push(phase);
        return phase;
      },
    });
  },
});
