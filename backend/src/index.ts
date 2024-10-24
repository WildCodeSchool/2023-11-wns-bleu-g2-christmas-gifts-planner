import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import express from "express";
import http from "http";
import db from "./config/db";
import schema from "./config/schema";
import env from "./env";

import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import { ContextType } from "./types/ContextType";

const app = express();
const httpServer = http.createServer(app);

const { SERVER_PORT: port } = env;

// Creating the WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  path: "/",
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.

const serverCleanup = useServer({ schema }, wsServer);
const main = async () => {
  await db.initialize();
  const server = new ApolloServer<ContextType>({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await server.start();

  app.use(
    "/",
    cors<cors.CorsRequest>({
      credentials: true,
      origin: env.CORS_ALLOWED_ORIGINS.split(","),
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/`);
};

main();
