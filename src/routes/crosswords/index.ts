import { FastifyPluginAsync } from "fastify";

import { getCrosswordsHandler } from "./crosswords.controller";

const crosswords: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  //* get crosswords
  fastify.get("", {
    // preValidation: fastify.authenticate,
    schema: {
      tags: ["Crosswords"],
    },
    handler: getCrosswordsHandler,
  });
};

export default crosswords;
