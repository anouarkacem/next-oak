import { objectType } from "nexus";

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
