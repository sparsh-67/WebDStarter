const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb://127.0.0.1:27017";

// Create a new MongoClient
const client = new MongoClient(uri,{ useUnifiedTopology: true });

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    const database=client.db("shopDb");
    const collection=database.collection('fruits');
    const result=await collection.deleteOne({name:"NewGreenApple"});
    console.log(`${result.matchedCount} docs were found and ${result.deletedCount} docs were deleted!`,)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
