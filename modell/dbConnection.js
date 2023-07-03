const { MongoClient } = require('mongodb');
const url = 'mongodb://ahmadb_ahma:XU5N7NXCL@mongodb1.f4.htw-berlin.de:27017/ahmadb'
const dbName = 'ahmadb'
let db

async function connectToDatabase() {
    console.log("connecting to DB ..")
    // MongoClient.connect(url) liefert eine Promise zurück
    // Fehlerbehandlung: - der connect() kann eine callback-Funktion übergeben werden,
    //                     die hat 2 Parameter, error und client die je nach der Fall weiterbenutzt werden können
    //                   - Try, Catch: zum Fehler behandeln, solange wir wissen, dass eine Expetion geworfen werden kann
    //                      dafür muss man aber "await" benutzen denn wir eine Promise erwarten und try,catch sind
    //                      normalise für die Fehlerbehandlung im syc Code.
    //                   - Then, Catch: wie try, catch allerdings für asyc Aufrufe gedacht also mit Promisen
    //                      denn then wird erst aufgerufen, wenn die Promise (erfolgreich) zurückgeliefert ist
    //                      deswegen braucht man "await" nicht mehr und deswegen blockieren wir nicht bis die Promise zurückgeliefert ist !!
    try {
        const client = await MongoClient.connect(url)

        console.log("connected to DB established")
        db = client.db(dbName);
    } catch (err) {
        console.log("connect to DB failed !")
        console.log("Error Message: " + err.message)
        throw new Error()
        // db = false
    }
}

// Singleton:
exports.getDB = async function () {
    if (!db) {
        await connectToDatabase()
    }
    return db
}