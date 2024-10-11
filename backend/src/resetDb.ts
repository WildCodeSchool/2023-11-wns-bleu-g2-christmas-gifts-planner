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

  const firstAdminGroup = new Group();
  Object.assign(firstAdminGroup, {
    name: "My best family group",
    owner: admin,
  });
  const secondAdminGroup = new Group();
  Object.assign(secondAdminGroup, {
    name: "Perceval group",
    owner: admin,
  });

  const tertiaryAdminGroup = new Group();
  Object.assign(tertiaryAdminGroup, {
    name: "My best friends group",
    owner: admin,
  });

  firstAdminGroup.members = [userJonas, userMateo, userEnola];

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

  firstJonasGroup.members = [admin, userMateo];

  await firstAdminGroup.save();
  await secondAdminGroup.save();
  await tertiaryAdminGroup.save();

  await firstJonasGroup.save();
  await secondJonasGroup.save();

  const jonasChannel = new Channel();
  Object.assign(jonasChannel, {
    name: "Jonas's channel",
    group: firstAdminGroup,
  });
  await jonasChannel.save();

  const mateoChannel = new Channel();
  Object.assign(mateoChannel, {
    name: "Mateo's channel",
    group: firstAdminGroup,
  });
  await mateoChannel.save();

  const enolaChannel = new Channel();
  Object.assign(enolaChannel, {
    name: "Enola's channel",
    group: firstAdminGroup,
  });
  await enolaChannel.save();

  const adminChannel = new Channel();
  Object.assign(adminChannel, {
    name: "Admin's channel",
    group: firstJonasGroup,
  });
  await adminChannel.save();

  const mateoChannel2 = new Channel();
  Object.assign(mateoChannel2, {
    name: "Mateo's channel",
    group: firstJonasGroup,
  });
  await mateoChannel2.save();

  const message01 = new Message();
  Object.assign(message01, {
    content: "Hello Mateo, i tought about an amazing gift for pierre! a fish!",
    sent_at: "2024-07-03 18:10:31",
    channelId: 1,
    writtenBy: {
      id: 2,
    },
  });
  await message01.save();

  const message02 = new Message();
  Object.assign(message02, {
    content: "lol, Jonas!",
    sent_at: "2024-07-03 18:11:02",
    channelId: 1,
    writtenBy: {
      id: 3,
    },
  });
  await message02.save();

  const message03 = new Message();
  Object.assign(message03, {
    content: "message03",
    sent_at: "2024-07-03 18:11:02",
    channel: 1,
    writtenBy: {
      id: 3,
    },
  });
  await message03.save();

  await db.destroy();
  console.log("Database reset complete");
}

main();
