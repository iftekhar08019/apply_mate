import { MongoClient, Db } from "mongodb";

let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
  if (db) return { client, db };

  client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI!);
  await client.connect();
  db = client.db(process.env.NEXT_PUBLIC_DB_NAME!);

  return { client, db };
}

export const collectionName = {
  USERS: "users",
  APPLICATIONS: "applications",
};
