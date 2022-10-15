import { NextApiRequest, NextApiResponse } from "next";
import { server } from "@lib/apolloServer";
import NextCors from "nextjs-cors";

export const config = {
  api: {
    bodyParser: false,
  },
};

const serverStart = server.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Credentials: expose the response to the frontend JavaScript
  // Origin: Allow apollo studio
  await NextCors(req, res, {
    credentials: true,
    origin: ["https://studio.apollographql.com"],
  });

  // Server must start before handler
  await serverStart;
  await server.createHandler({
    path: "/api/graphql",
  })(req, res);
  return;
}
