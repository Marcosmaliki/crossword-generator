import fp from "fastify-plugin";
import fjwt from "@fastify/jwt";
import dotenv from "dotenv";

dotenv.config();
export default fp(async (fastify, opts) => {
  fastify.register(fjwt, {
    sign:{
      expiresIn: '30d',
    },
    secret: process.env.API_SECRET_KEY|| 'mystr@ngeSecr3tK£Y!$!'
  });


  //todo: uncomment below to enforce auth for all routes
//   fastify.addHook("onRequest", async (request, reply) => {
//     try {
//       await request.jwtVerify()
//     } catch (err) {
//       reply.send(err)
//     }

  fastify.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

});

declare module "fastify" {
  export interface FastifyInstance {
    authenticate(): string;
  }
}
