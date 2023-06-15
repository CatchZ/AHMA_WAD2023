let users = [{
    "userName": "admina",
    "password": "admina",
    "admin": true
},
    {
        "userName": "user",
        "password": "user",
        "admin": false
    }]


let locationsList = [{
    "locationName": "Bayerische Motoren Werke AG",
    "streetName": "Am Juliusturm",
    "streetNumber": 14,
    "postcode": 13599,
    "c02InTons": 12900,
    "description": "Bayerische Motoren",
    "latitude": "52.538329",
    "longitude": "13.228278",
    "photo": ""
},
    {
        "locationName": "Bayer AG",
        "streetName": "Müllerstr.",
        "streetNumber": 178,
        "postcode": 13353,
        "c02InTons": 39648,
        "description": "HKW Bayer",
        "latitude": "52.540803",
        "longitude": "13.368838",
        "photo": ""
    },
    {
        "locationName": "Blockheizkraftwerksträger- und Betreiber.",
        "streetName": "Albert-Einstein-Str.",
        "streetNumber": 22,
        "postcode": 12489,
        "c02InTons": 44997,
        "description": "HKW Adlershof",
        "latitude": "52.42700181421365 ",
        "longitude": "13.5278661539540",
        "photo": ""
    }
]


exports.login = function (request, response) {

    console.log("controller got login request ..")
    // get the data from requestObject:
    let data = request.body
    console.log("Controller checking the user " + data.userName + " ..")

    for (const user of users) {
        if (data.userName === user.userName) {
            console.log("controller found the username ..")
            if (data.password === user.password) {
                console.log("controller found the password ..")
                // send response:
                let responseData = {
                    message: 'login successfully',
                    data: { userName: user.userName, admin: user.admin }
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
}

exports.deleteLocation = function (locationNameToDelete, response) {

    console.log("controller got delete request .. ")
    console.log("Locations list size: " + locationsList.length)

    const index = locationsList.findIndex(elem => locationNameToDelete === elem.locationName)

    if (index === -1) {
        console.log("controller cannot find the location !")
        response.status(500).json("location not found")
    } else {
        console.log("controller found the location index ..")
        locationsList.splice(index, 1)

        console.log("location has been deleted")
        console.log("Locations list size: " + locationsList.length)
        response.status(200).json("location has been deleted")
    }
}