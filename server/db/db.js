import { MongoClient } from 'mongodb';
const uri = "mongodb+srv://maxPerformanceDB:maxPerformance123@maxperformance.f203yk9.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const dbName='maxPerformance';


 async function  connectToDatabase(){
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

async function  closeDatabaseConnection() {
  try {
    await client.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing the database connection:', error);
    throw error;
  }
}


export {connectToDatabase,client,dbName,closeDatabaseConnection};
