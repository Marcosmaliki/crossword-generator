import { FastifyPluginAsync } from "fastify";
import { crosswordId } from "./crossword.schema";

import { deleteCrosswordsHandler, getCrosswordsHandler } from "./crosswords.controller";

const crosswords: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  //* get crosswords
  fastify.get("", {
    // preValidation: fastify.authenticate,
    schema: {
      tags: ["Crosswords"],
    },
    handler: getCrosswordsHandler,
  });

   //! delete crossword
   fastify.delete("/delete/:id", {
    // preValidation: fastify.authenticate,
    schema: {
      tags: ["Crosswords"],
      params: crosswordId
    },
  
    handler: deleteCrosswordsHandler,
  });
};

export default crosswords;
