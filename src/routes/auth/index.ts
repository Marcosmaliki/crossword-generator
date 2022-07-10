import { FastifyPluginAsync } from "fastify";
import { loginHandler, registerUserHandler } from "./auth.controller";
import { userInput, userInputLogin } from "./auth.schema";


const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  //* register
  fastify.post("/register", {
    // preValidation: fastify.authenticate,
    schema: {
      tags: ["Auth"],
      body: userInput
    },
    handler: registerUserHandler,
  });

  //* login
  fastify.post("/login", {
    // preValidation: fastify.authenticate,
    schema: {
      tags: ["Auth"],
      body: userInputLogin
    },
    handler: loginHandler,
  });
};

export default auth;
