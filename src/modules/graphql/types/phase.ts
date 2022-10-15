import { objectType } from "nexus";

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
      resolve: (_, args, ctx) => {},
    });
  },
});

// QUERIES

// Mutations
