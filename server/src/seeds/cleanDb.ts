import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    const model = models[modelName];
    if(!model){
      throw new Error(`Model ${modelName} not found.`);
    } 
    const mongooseDB = db; 
    if(!mongooseDB || !mongooseDB.db) {
      throw new Error('No connection to MongoDB.');
    }

    let modelExists = await mongooseDB.db.listCollections({
      name: collectionName
    }).toArray()

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}
