import db from "./db";
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

  const admin = User.create({
    firstName: "John",
    lastName: "Doe",
    email: "admin@app.com",
    // hashedPassword: await hashPassword("adminadmin"),
  });
  await admin.save();

  await db.destroy();
  console.log("done !");
}

main();
