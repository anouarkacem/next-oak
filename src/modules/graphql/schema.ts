import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "@modules/graphql/types";

const schema = makeSchema({
  types,
  contextType: {
    module: join(process.cwd(), "./src/types/context.d.ts"),
    export: "Context",
  },
  outputs: {
    schema: join(process.cwd(), "./generated/schema.graphql"),
    typegen: join(process.cwd(), "./generated/nexus.typegen.d.ts"),
  },
});

export { schema };
