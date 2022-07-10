import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import swagger from "@fastify/swagger";

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
    // swagger for documentation
    fastify.register(require("@fastify/cors"), {
      origin: "*",
    });
    
    void fastify.register(swagger, {
      routePrefix: "/docs",
      swagger: {
        info: {
          title: "CROSSWORD APP",
          description: "This is a web service for CROSSWORD APP",
          version: "1.0.0",
          // contact: {
          //   email: "marcoseznavil@gmail.com",
          //   name: "Marcos Maliki",
          //   // url: "#",
          // },
        },
        externalDocs: {
          url: "#",
          description: "Find more info here",
        },
        tags: [
          { name: "Auth"},
          { name: "Generate", description: "Generate crossword" },
          { name: "Crosswords", description: "View crosswords" },
          
        ],
        host: process.env.SWAGGER_SERVER, // "197.248.119.187:2000", //"286e6d9e5516.ngrok.io",
        basePath: "/",
        schemes: ["http", "https"],
        consumes: [
          "application/json",
          "multipart/form-data",
          "application/x-www-form-urlencoded",
        ],
        produces: ["application/json"],
        definitions: {},
        securityDefinitions: {
          apiKey: {
            type: "apiKey",
            description:
              'Standard Authorization header using the Bearer scheme. Example: "Bearer {TOKEN}"',
            name: "Authorization",
            in: "header",
          },
        },
        security: [{ apiKey: [] }],
      },
      hideUntagged: true,
      exposeRoute: true,
    });

  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })

};

export default app;
export { app }
