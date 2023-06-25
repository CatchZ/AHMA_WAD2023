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

server.delete('/locations', (request, response) => {
    console.log("HTTP-Delete-Request from Client .. ")
    console.log("server found the parameter: " + request.query.key)
    console.log("HTTP-Delete-Request forward to controller .. ")

    controller.deleteLocation(request.query.key, response)
})

server.put('/location/:userName', (req, res) => {
    console.log("HTTP-put-Request from Client .. ")
    const userName = req.params.userName;
    const updateData = req.body;
    console.log(userName + req.body)
})



// Starten des Servers:
server.listen(port, () => {
    console.log('Server is listing on port: ' + port + " ..");
});