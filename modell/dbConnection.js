const { MongoClient } = require('mongodb');
const url = 'mongodb://ahmadb_ahma:XU5N7NXCL@mongodb1.f4.htw-berlin.de:27017/ahmadb'
const dbName = 'ahmadb'
let db

async function connectToDatabase() {
    console.log("connecting to DB ..")
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("connected to DB established")
    db = client.db(dbName);
}

async function getDB() {
    if (!db) {
        await connectToDatabase()
    }
    return db
}

module.exports = {
    getDB,
}