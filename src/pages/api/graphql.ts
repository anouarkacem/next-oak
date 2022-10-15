import { NextApiRequest, NextApiResponse } from "next";
import { server } from "@lib/apolloServer";

const serverStart = server.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Server must start before handler
  await serverStart;
  await server.createHandler({
    path: "/api/graphql",
  })(req, res);
}
