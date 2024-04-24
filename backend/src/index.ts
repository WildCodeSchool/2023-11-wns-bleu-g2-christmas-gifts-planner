import "reflect-metadata";
import db from "./db";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from "type-graphql";
import { UserResolver } from './resolvers/UserResolver';


const main = async () => {
    await db.initialize();
    console.log("Database initialized");
    const schema = await buildSchema({
      resolvers: [UserResolver],
    });
    const server = new ApolloServer({schema})
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4001 },
      });
      
      console.log(`🚀  Server ready at: ${url}`);
    
};

main();