import { MongoClient, Collection } from "mongodb";

export class MongoDBService {
  private client: MongoClient;
  private database: string;
  private collection: string;

  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI as string, {});
    this.database = process.env.MONGODB_DATABASE as string;
    this.collection = process.env.MONGODB_COLLECTION as string;
  }

  async connect() {
    await this.client.connect();
    console.log("Connected to MongoDB");
  }

  async disconnect() {
    await this.client.close();
    console.log("Disconnected from MongoDB");
  }

  async getCollection(): Promise<Collection> {
    return this.client.db(this.database).collection(this.collection);
  }
}
