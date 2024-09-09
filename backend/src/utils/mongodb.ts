import { MongoClient } from "mongodb";

let client: MongoClient;

export const connectToDatabase = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is not defined in the environment variables");
  }

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log("Connected to MongoDB");
  }

  return client.db("ball_sorting_game"); 
};
