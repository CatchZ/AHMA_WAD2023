const { ObjectId } = require("mongodb");
const modell = require('../modell/dbConnection');
const express = require("express");
let db
let usersFromDB
const controller = express()

// die Middleware wird normalerweise im Request-Response-Lebenszyklus von Express eingesetzt,
// das heißt, wenn die Methoden von außen aufgerufen werden (weil sie exportiert sind)
// wird diese Middleware nicht ausgeführt
/*
controller.use(() => {
    db = modell.getDB()
})
 */

exports.login = async function (request, response) {

    try {
        await connectToDB()

        console.log("controller got login request ..")
        // get the data from requestObject:
        let data = request.body

        console.log("Controller getting the user document from db ..")

        // .find({}).toArray() liefert eine Promise zurück
        // Promises repräsentieren asynchrone Operationen, die im Hintergrund ablaufen können,
        // während der Rest des Codes weiter ausgeführt wird.
        // Deswegen rufen wir sie mit await, weil sonst machen wir weiter ohne die Daten aus der DB
        let documents = await db.collection("users").find({}).toArray()

        console.log("Users got from DB")
        console.log(documents.toString())
        usersFromDB = documents

        console.log("Controller checking the user " + data.userName + " ..")
        for (const user of usersFromDB) {
            if (data.userName === user.userId) {
                console.log("controller found the username ..")
                if (data.password === user.password) {
                    console.log("controller found the password ..")
                    // send response:
                    let responseData = {
                        message: 'login successfully',
                        data: {userName: user.userId, admin: user.role}
                    }
                    response.status(200).json(responseData)
                    return
                } else {
                    // send error response:
                    response.status(500).json({message: "wrong password"})
                    return
                }
            }
        }
        // send error response:
        response.status(500).json({"message": "user is not registered"})

    } catch (error) {
        console.log("connect to DB failed !")
        // send error response:
        response.status(500).json({message: "connect to DB failed !"})
    }
}

exports.deleteLocation = async function (locationIdToDelete, response) {

    console.log("controller got delete request .. ")

    try {
        await connectToDB()
    } catch (error) {
        console.log("connect to DB failed !")
        // send error response:
        response.status(500).json({message: "connect to DB failed !"})
    }

    console.log("Controller forwarding the delete request to DB ..")

    try {
        console.log("controller sending delete request tp DB .. ")
        await db.collection("locations").deleteOne({_id: new ObjectId(locationIdToDelete)})
        console.error("Object deleted successfully")
        response.status(204).json({message: 'Object deleted successfully'})

    } catch (err) {
        console.error("Error deleting object: ", err)
        response.status(500).json({error: 'Internal server Error'})
    }

}
exports.getOneLocations = async function (objectId,response){
    try {
        await connectToDB()
    } catch (error) {
        console.log("connect to DB failed !")
        // send error response:
        response.status(500).json({message: "connect to DB failed !"})
    }

    console.log("Controller forwarding the get location request to DB ..")

    try {
        let result  = await  db.collection("locations").findOne({ _id: ObjectId(objectId) });
        response.status(200).json(result)
    } catch (err) {
        console.log("error on loading the locations from db: " , err.message)
        response.status(500).json({message: "no locations found"})
    }
}

exports.getLocations = async function (response){
    try {
        await connectToDB()
    } catch (error) {
        console.log("connect to DB failed !")
        // send error response:
        response.status(500).json({message: "connect to DB failed !"})
    }

    console.log("Controller forwarding the get location request to DB ..")

    try {
        let result  = await db.collection("locations").find({}).toArray()
        response.status(200).json(result)
    } catch (err) {
        console.log("error on loading the locations from db: " , err.message)
        response.status(500).json({message: "no locations found"})
    }
}

exports.updateLocation = async function (objectId, data, res) {
    console.log("controller got update request .. ")
    try {
        await connectToDB()
    } catch (error) {
        console.log("connect to DB failed !")
        // send error response:
        response.status(500).json({message: "connect to DB failed !"})
    }

    await db.collection("locations").updateOne(
        {_id: new ObjectId(objectId)},
        { $set: data },
        (err, result) => {
            if (err) {
                console.error("Error updating object:",err)
                res.status(500).json({error: 'Internal server Error'})
            } else {
                res.status(204).json({message:'Object updated succesfully'})

            }
        }
    )
}

exports.addLocation = async function (data, response){

    try {
        await connectToDB()
    } catch (error) {
        console.log("connect to DB failed !")
        // send error response:
        response.status(500).json({message: "connect to DB failed !"})
    }

    //const db = await getDB()
   // console.log("data:"+data.body)
    //const result = await db.collection("locations").insertOne(data.body)
   // return result
    try {
        let result  = await db.collection("locations").insertOne(data.body)
        response.status(201).json(result)
    } catch (err) {
        console.log("error on adding to Database: " , err.message)
        response.status(500).json({message: "no locations found"})
    }
}

async function connectToDB() {
    db = await modell.getDB()
}