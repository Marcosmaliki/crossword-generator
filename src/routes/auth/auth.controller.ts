import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";

import { Database } from "fakebase";
import { userInputLoginType, userInputType } from "./auth.schema";

const db = new Database("./data/");
const users = db.table("users");

//* register
export async function registerUserHandler(
  req: FastifyRequest<{ Body: userInputType }>,
  reply: FastifyReply
) {
  const user = await users.create(req.body);

  const token = this.jwt.sign(user);

  return { token, user };
}

//* log in
export async function loginHandler(
  req: FastifyRequest<{ Body: userInputLoginType }>,
  reply: FastifyReply
) {
  const userReq = req.body;

  //@ts-ignore
  const user = await users.findOne( (item) => item.email == userReq.email && item.password == userReq.password
  );

  if(!user){
    return reply.code(401).send({
      success: false,
      message: 'Wrong credentials'
    })
  }

  const token = this.jwt.sign(user);

  return { token, user };
}
