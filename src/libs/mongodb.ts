import { MongoClient, Db } from "mongodb";

let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
  if (db) return { client, db };

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  
  // DB_NAME is optional - extract from MONGODB_URI or use default
  const dbName = process.env.DB_NAME || extractDbNameFromUri(process.env.MONGODB_URI) || "applymate";
  db = client.db(dbName);

  return { client, db };
}

function extractDbNameFromUri(uri: string): string | null {
  try {
    const match = uri.match(/\/([^/?]+)(\?|$)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}
export const collectionName = {
  USERS: "users",
  APPLICATIONS: "applications",
  JOBS: "jobs",
  REVIEWS: "reviews",
};
