import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";

import { Database } from "fakebase";
import { crosswordIdType } from "./crossword.schema";

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

//! delete Crossword Handler
export async function deleteCrosswordsHandler(
  req: FastifyRequest<{Params:crosswordIdType}>,
  reply: FastifyReply
) {

  const id = req.params.id;
   await crosswords.delete(id);

  return {success: true, message:'Crossword deleted successfully'};
}


