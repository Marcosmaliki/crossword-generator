import { FastifyPluginAsync } from "fastify";

const ocr: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {});
};

export default ocr;
