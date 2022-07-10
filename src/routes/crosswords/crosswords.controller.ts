import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";

import { Database } from "fakebase";

const db = new Database("./data/");
const crosswords = db.table("crosswords");

//* generate Crossword Handler
export async function getCrosswordsHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {


  const crosswordsRes = await crosswords.findAll();

  return crosswordsRes;
}
