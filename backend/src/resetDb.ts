import db from "./config/db";
import Group from "./entities/Group";
import Channel from "./entities/Channel";
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

  await firstAdminGroup.save();
  await secondAdminGroup.save();
  await tertiaryAdminGroup.save();

  const mateoChannel = new Channel();
  Object.assign(mateoChannel, {
    name: "Mateo's channel",
    group: firstAdminGroup,
  }); 
  await mateoChannel.save();
  
  const ninaChannel = new Channel();
  Object.assign(ninaChannel, {
    name: "Nina's channel",
    group: firstAdminGroup,
  }); 
  await ninaChannel.save();

  const enolaChannel = new Channel();
  Object.assign(enolaChannel, {
    name: "Enola's channel",
    group: secondAdminGroup,
  }); 
  await enolaChannel.save();

  const valentinaChannel = new Channel();
  Object.assign(valentinaChannel, {
    name: "Valentinas's channel",
    group: secondAdminGroup,
  }); 
  await valentinaChannel.save();

  await db.destroy();
  console.log("done !");
}

main();
