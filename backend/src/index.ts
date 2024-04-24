import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import schema from "./schema";
import cors from "cors";
import db from "./db";

const { SERVER_PORT: port } = env;
import env from "./env";


const app = express();
const httpServer = http.createServer(app);

const main = async () => {
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await db.initialize();

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: [
        "https://www.your-app.example/",
        "https://studio.apollographql.com/",
      ],
    }),
    express.json(),
    expressMiddleware(server)
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port }, resolve)
  );
  console.log('🚀 Server ready at http://localhost:4001/graphql');
};

main();