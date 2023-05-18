'use strict';
const locations = [ {
    "locationName": "Bayerische Motoren Werke AG",
    "streetName": "Am Juliusturm",
    "streetNumber": 14,
    "postcode": 13599,
    "c02InTons": 12900,
    "description": "-",
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
        "locationName": "Blockheizkraftwerks- Träger- und Betreibergesellschaft mbH Berlin",
        "streetName": "Albert-Einstein-Str.",
        "streetNumber": 22,
        "postcode": 12489,
        "c02InTons": 44997,
        "description": "HKW Adlershof",
        "latitude": "52.42700181421365 ",
        "longitude": "13.5278661539540",
        "photo": ""
    }
];

const users = [{
    "userName": "admina",
    "password": "admina",
    "admin": true
    },
    {
    "userName": "user",
    "password": "user",
    "admin": false
    }
];

// Events-Targets:
const loginBtn = document.getElementById("login-btn")
const logoutBtn = document.getElementById("logout-btn")
const addLocationBtn = document.getElementById("add-location-btn")
const backToHomepageBtn = document.getElementById("homepage-btn")
const listUpdateBtn = document.getElementById("locations-list-update-btn")
const saveNewLocationBtn = document.getElementById("save-new-location-btn")
const cancelAddLocationBtn = document.getElementById("cancel-location-add-btn")
const saveLocationUpdateBtn = document.getElementById("save-location-update-btn")
const cancelLocationUpdateBtn = document.getElementById("cancel-location-update-btn")
// TODO get delete&update Buttons for each Element (querySelector() onClick "event" as target obj ?)


// Events-Handlers:
loginBtn.addEventListener("click", login)
logoutBtn.addEventListener("click", logout)
addLocationBtn.addEventListener("click", switchToAddLocation)
backToHomepageBtn.addEventListener("click", backToHomePage)
cancelAddLocationBtn.addEventListener("click", backToHomePage)
saveNewLocationBtn.addEventListener("click", addLocation)
listUpdateBtn.addEventListener("click", toggleUpdateTable)

// Events-Handling Functions:
function login() {

    // Inputs-Values:
    let usernameInput = document.getElementById("username-input").value;
    let passwordInput = document.getElementById("password-input").value;

    // Iteration the users-list:
    for(const user of users) {
        if (usernameInput===user.userName) {
            if(passwordInput===user.password) {
                // Reset the inputs values:
                document.getElementById("login-form").reset()
                // set welcome message:
                document.getElementById("welcome-user").textContent = user.userName
                // prepare the display for user:
                switch (user.admin) {
                    case true : {
                        loginAsAdmin();
                        return;
                    }
                    case false : {
                        loginAsUser();
                        return;
                    }
                }
            } else {
                alert("Wrong password !")
                return;
            }
        }
    }
    // if there is no match to the username:
    alert(usernameInput +" is not registered !")
}

function logout() {

    let logoutConfirm = confirm("Do you wont to logout ?")
    if(logoutConfirm) {
        displayToggle(["main-page","login-area","header-options"])
    } else {

    }
}

function switchToAddLocation() {
    displayToggle(["main-page","header-options","add-location-page"])
}

function backToHomePage() {
    // reset all form inputs:
    document.getElementById("add-form").reset()
    // back to homepage:
    displayToggle(["add-location-page","main-page","header-options"])
}

function addLocation() {

    // Inputs validation:
    // TODO

    // Get inputs values:
    let newLocationToAdd = {
        "locationName": document.getElementById("new-location-name").value,
        "streetName": document.getElementById("new-location-str-name").value,
        "streetNumber": document.getElementById("new-location-str-nr").value,
        "postcode": document.getElementById("new-location-postcode").value,
        "c02InTons": document.getElementById("new-location-co2").value,
        "description": document.getElementById("new-location-description").value,
        "latitude": document.getElementById("new-location-latitude").value,
        "longitude": document.getElementById("new-location-longitude").value,
        "photo": document.getElementById("new-location-img").value
    }

    // save the new location temporary in list:
    locations.push(newLocationToAdd)

    // show success message:
    document.getElementById("add-message").textContent = "Location has been added successfully "
    let img = new Image()
    img.src = "./img/ok-icon.png"
    document.getElementById("add-message").appendChild(img)

    // reset form inputs values:
    document.getElementById("add-form").reset()
}

function updateLocation() {
    // TODO
}

function deleteLocation() {
    // TODO
}

function cancelPage() {
    // TODO
}

// Sub-Functions:
function displayToggle(elementIds) {
    for (const elementId of elementIds) {
        document.getElementById(elementId).classList.toggle("none-display")
    }
}


/**
 * disable an Element on the side by id or if diabled show it as display:"block"
 * @param {*} element name of element that is to enable or diabled
 */
/** ready for cleanup
function disableEnableElement(element) {
    if (document.getElementById(element).style.display!="none") {
        document.getElementById(element).style.display!="none"
    } else {
        document.getElementById(element).style.display!="block"
    }
}*/

function loginAsAdmin(){

    // Change Display:
    displayToggle(["login-area","header-options","main-page", "locations-options-btns"])
}

function loginAsUser() {

    // Change Display:
    displayToggle(["login-area","header-options","main-page"])
}
/**
 * toggles UpdateTable Container
 */
 function toggleUpdateTable(){

    displayToggle(["update-container"])

 }

const updateTable = document.getElementById("updateTable");
/**
 * takes the locations const and generates the table body for the 
 * "overview-table"
 */
function generateUpdateTableBody(){
    locations.forEach(location => {
        const row = document.createElement("tr")
        for (const key in location) {
            if((key !=="latitude")&&(key!=="longitude")){
            const cell = document.createElement("td");
            cell.textContent = location[key];
            row.appendChild(cell);
            }
          }
        updateTable.appendChild(row)
        
    });

const loacationList = document.getElementById("locations-list")
/**
 * takes the locations const and for each Element
 * generates listelementes and appends them to the locationList const
 * using the Name field as inner Text
 */
function generateLocationList(){
    locations.forEach(location=>{
        const row = document.createElement("li");
        row.setAttribute("class","locations-list-element");
        const methodCall = "\"setLocationInputContainer"+"("+location.locationName+")\""
        row.setAttribute("onClick",methodCall);
        row.textContent = location.locationName;
        loacationList.appendChild(row)
    })
    
}

function setLocationInputContaine(locationName){
    
}




}

