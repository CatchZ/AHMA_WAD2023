const cors = require('cors');
const express = require('express');
const server = express();
const port = 3000;
const controller = require('./controller/controller.js');

// Die Middleware express.json() wird auf jede eingehende Anfrage angewendet,
// bevor die Routenverarbeitung stattfindet. Sie analysiert den Request-Body und parst ihn als JSON
server.use(express.json());
server.use(cors())

// Endpunkt für AJAX-Anfragen, der Client schickt eine Anfrage nicht nur generell an den Server,
// sondern an einen Endpunkt, den wird empfangt und weiter verarbeitet ja nach der Implemtierung
// sobald eine POST-HTTP-REQUEST eingeht, wird diese an den Controller weitergegeben
// auf dem Controller wird die Methode login() aufgerufen
// der Endpunkt heißt in dem Fall http://localhost:3000/login
server.post('/login', (request, response) => {
    console.log("HTTP-Request login from Client .. ")
    console.log("HTTP-Request login forward to controller .. ")
    controller.login(request, response)
})
server.post('/locations', (request, response) => {
    console.log("HTTP-Request add from Client .. ")
    console.log("HTTP-Request add forward to controller .. ")
    controller.addLocation(request, response)
})

server.delete('/locations/:locationId', (request, response) => {
    console.log("HTTP-Delete-Request from Client .. ")
    console.log("server found the parameter: " + request.params.locationId)
    console.log("HTTP-Delete-Request forward to controller .. ")

    controller.deleteLocation(request.params.locationId, response)
})

server.put('/locations/:userName', (req, res) => {
    console.log("HTTP-put-Request from Client .. ")
    const objectID = req.params.userName;
    const updateData = req.body;
    console.log(JSON.stringify(objectID)+ JSON.stringify(updateData))
    controller.updateLocation(objectID, updateData, res)
})


server.get('/locations',(request, response) => {
    console.log("HTTP-Get-locations-Request from Client .. ")
    controller.getLocations(response)
})

server.get('/locations/:_id',(request, response) => {
    console.log("HTTP-GetOne-locations-Request from Client .. ")
    controller.getOneLocations(request.params._id,response)
})

// Starten des Servers:
server.listen(port, () => {
    console.log('Server is listing on port: ' + port + " ..");
});

