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