// Read the .env file.
import * as dotenv from "dotenv";
// import SchemaBuilder from '@pothos/core';
dotenv.config();

// Require the framework
import Fastify, { FastifyReply, FastifyRequest } from "fastify";

// Require library to exit fastify process, gracefully (if possible)
import closeWithGrace from "close-with-grace";

// Instantiate Fastify with some config
const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },

  ajv: {
    customOptions: {
      strict: "log",
      keywords: ["kind", "modifier"],
    },
  },
});

// Register your application as a normal plugin.
app.register(import("./app"));

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace({ delay: 500 }, async function ({
  signal,
  err,
  manual,
}) {
  if (err) {
    app.log.error(err);
  }
  await app.close();
} as closeWithGrace.CloseWithGraceAsyncCallback);

app.addHook("onClose", async (instance, done) => {
  closeListeners.uninstall();
  done();
});



// Start listening.
app.listen({ port: 3000, host: "0.0.0.0" }, (err: any, address: string) => {
  //parseInt(process.env.PORT) ||
  if (err) {
    app.log.error(err);
    process.exit(1);
  } else {
    app.log.info(`🚀 Server running at located at ${address}`);
  }
});
