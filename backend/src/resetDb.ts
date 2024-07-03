import db from "./config/db";
import Message from "./entities/Message";
import User, { hashPassword } from "./entities/User";

export async function clearDB() {
  const runner = db.createQueryRunner();
  await runner.query("SET session_replication_role = 'replica'");
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`)
    )
  );
  await Promise.all(
    db.entityMetadatas.map(async (entity) =>
      runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`)
    )
  );
  await runner.query("SET session_replication_role = 'origin'");
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

  const message01 = new Message();
  Object.assign(message01, {
    content: "Hello Mateo, i tought about an amazing gift for pierre! a fish!",
    sent_at: "2024-07-03 18:10:31",
    writtenBy: {
      id:2
    }
  });
  await message01.save();

  const message02 = new Message();
  Object.assign(message02, {
    content: "lol, Jonas!",
    sent_at: "2024-07-03 18:11:02",
    writtenBy: {
      id:3
    }
  });
  await message02.save();

  await db.destroy();
  console.log("done !");
}

main();
