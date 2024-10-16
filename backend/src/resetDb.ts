import db from "./config/db";
import Message from "./entities/Message";
import Group from "./entities/Group";
import Channel from "./entities/Channel";
import User, { UserRole, hashPassword } from "./entities/User";
import { NewMessageInputType } from "./types/NewMessageType";

export async function clearDB() {
  const runner = db.createQueryRunner();
  // await runner.query("SET session_replication_role = 'replica'");
  // await Promise.all(
  //   db.entityMetadatas.map(async (entity) =>
  //     runner.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`)
  //   )
  // );
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`)
    )
  );
  // await runner.query("SET session_replication_role = 'origin'");
  await db.synchronize();
}

export default async function main() {
  await db.initialize();
  await clearDB();

  const admin = new User();
  Object.assign(admin, {
    firstName: "admin",
    lastName: "admin",
    email: "admin@app.com",
    password: "4dminAdmin@!",
    role: UserRole.Admin,
  });
  await admin.save();

  const userJonas = new User();
  Object.assign(userJonas, {
    firstName: "Jonas",
    lastName: "Brun",
    email: "jonas.brun@example.com",
    password: "JonasBrun1+",
  });
  await userJonas.save();

  const userMateo = new User();
  Object.assign(userMateo, {
    firstName: "Mateo",
    lastName: "Gaillard",
    email: "mateo.gaillard@example.com",
    password: "MateoGaillard1+",
  });
  await userMateo.save();

  const userEnola = new User();
  Object.assign(userEnola, {
    firstName: "Enola",
    lastName: "Roger",
    email: "enola.roger@example.com",
    password: "EnolaRoger1+",
  });
  await userEnola.save();

  const userValentina = new User();
  Object.assign(userValentina, {
    firstName: "Valentina",
    lastName: "Pierre",
    email: "valentina.pierre@example.com",
    password: "ValentinaPierre1+",
  });
  await userValentina.save();

  const userNina = new User();
  Object.assign(userNina, {
    firstName: "Nina",
    lastName: "Louis",
    email: "nina.louis@example.com",
    password: "NinaLouis1+",
  });
  await userNina.save();

  // Creating groups by Jonas
  const firstJonasGroup = new Group();
  Object.assign(firstJonasGroup, {
    name: "Gifty group",
    owner: userJonas,
  });
  const secondJonasGroup = new Group();
  Object.assign(secondJonasGroup, {
    name: "Lance-lots",
    owner: userJonas,
  });

  // Creating groups by Mateo

  firstJonasGroup.members = [userValentina, userMateo];
  const firstMateoGroup = new Group();
  Object.assign(firstMateoGroup, {
    name: "My best family group",
    owner: userMateo,
  });
  const secondMateoGroup = new Group();
  Object.assign(secondMateoGroup, {
    name: "Le Perceval est une ordure",
    owner: userMateo,
  });

  firstMateoGroup.members = [userJonas, userValentina, userEnola];

  await firstJonasGroup.save();
  await secondJonasGroup.save();

  await firstMateoGroup.save();
  await secondMateoGroup.save();

  // Creating channels

  const mateoChannel = new Channel();
  Object.assign(mateoChannel, {
    name: "Mateo's channel",
    receiver: 3,
    group: firstJonasGroup,
  });
  await mateoChannel.save();

  const valentinaChannel2 = new Channel();
  Object.assign(valentinaChannel2, {
    name: "Valentina's channel",
    receiver: 5,
    group: firstJonasGroup,
  });
  await valentinaChannel2.save();

  const jonasChannel = new Channel();
  Object.assign(jonasChannel, {
    name: "Jonas's channel",
    receiver: 2,
    group: firstMateoGroup,
  });
  await jonasChannel.save();

  const enolaChannel = new Channel();
  Object.assign(enolaChannel, {
    name: "Enola's channel",
    receiver: 4,
    group: firstMateoGroup,
  });
  await enolaChannel.save();

  const valentinaChannel = new Channel();
  Object.assign(valentinaChannel, {
    name: "Valentina's channel",
    receiver: 5,
    group: firstMateoGroup,
  });
  await valentinaChannel.save();

  const message01 = new Message();
  Object.assign(message01, {
    content:
      "Hello Valentina, i tought about an amazing gift for Mateo! a fish!",
    sent_at: "2024-07-03 18:10:31",
    channelId: 1,
    groupId: 1,
    writtenBy: {
      id: 2,
    },
  });
  await message01.save();

  const message02 = new Message();
  Object.assign(message02, {
    content: "lol, Jonas! That's a unique idea. I think he will love it!",
    sent_at: "2024-07-03 18:11:02",
    channelId: 1,
    groupId: 1,
    writtenBy: {
      id: 5,
    },
  });
  await message02.save();

  const message03 = new Message();
  Object.assign(message03, {
    content: "I'm in for the fish! Let's do it!",
    sent_at: "2024-07-03 18:11:02",
    channelId: 1,
    groupId: 1,
    writtenBy: {
      id: 2,
    },
  });
  await message03.save();

  await db.destroy();
  console.log("Database reset complete");
}

main();
