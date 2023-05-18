'use strict';

// Variables:
let map;

// Events-Targets:
const loginBtn = document.getElementById("login-btn")
const logoutBtn = document.getElementById("logout-btn")
const addLocationBtn = document.getElementById("add-location-btn")
const backToHomepageBtn = document.getElementById("homepage-btn")
const saveNewLocationBtn = document.getElementById("save-new-location-btn")
const cancelAddLocationBtn = document.getElementById("cancel-location-add-btn")
const listUpdateBtn = document.getElementById("locations-list-update-btn")
const saveLocationUpdateBtn = document.getElementById("save-location-update-btn")
const cancelLocationUpdateBtn = document.getElementById("cancel-location-update-btn")

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
    for(const user of getUsersAsObj()) {
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

    // ask to confirm the logout:
    let logoutConfirm = confirm("Do you wont to logout ?")
    if(logoutConfirm) {
        displayToggle(["main-area","login-area","header-options"])
    }
}

function switchToAddLocation() {
    displayToggle(["main-area","header-options","add-location-page"])
}

function backToHomePage() {
    // reset all form inputs:
    document.getElementById("add-form").reset()
    // back to homepage:
    displayToggle(["add-location-page","main-area","header-options"])
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

    // update locations list:

    // update map:
    refreshLocatiosMarkers()
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

function displayToggle(elementIds) {

    // Iteration the elements as list:
    for (const elementId of elementIds) {
        // Toggle the class "none-display" for the current element:
        document.getElementById(elementId).classList.toggle("none-display")
    }
}


function loginAsAdmin(){

    // Change Display:
    displayToggle(["login-area","header-options","main-area", "locations-options-btns"])
    // Display the Map:
    initMap()
    // Display the Locations:
    generateLocationList()
}

function loginAsUser() {

    // Change Display:
    displayToggle(["login-area","header-options","main-area"])
    // Display the Map
    initMap()
    // Display the Locations:
    generateLocationList()
}

function getUsersAsObj() {
    let users = [{
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
    return  users;
}

function getLocationsAsObj() {

    let locations = [ {
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

    return locations
}

function initMap() {

    const mapInitOptions = {
        position: [52.520008, 13.404954],
        zoom: 10
    }

    // Map Obj:
    map = L.map('map-container');
    map.setView(mapInitOptions.position, mapInitOptions.zoom);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Markers:
    refreshLocatiosMarkers()
}

function refreshLocatiosMarkers() {

    getLocationsAsObj().forEach( location => {
        // Marker Object:
        var marker = L.marker([location.latitude,location.longitude]);
        marker.addTo(map);
        // Add Location info in popup window:
        marker.bindPopup(location.locationName);
    })
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
    getLocationsAsObj().forEach(location => {
        const row = document.createElement("tr")
        for (const key in location) {
            if((key !=="latitude")&&(key!=="longitude")){
            const cell = document.createElement("td");
            cell.textContent = location[key];
            row.appendChild(cell);
            }
          }
        updateTable.appendChild(row)
        
    })
}

const loacationList = document.getElementById("locations-list");
/**
 * takes the locations const and for each Element
 * generates listelementes and appends them to the locationList const
 * using the Name field as inner Text
 */
function generateLocationList(){

    getLocationsAsObj().forEach(location=> {
        const row = document.createElement("li");
        row.setAttribute("class","locations-list-element");

        row.addEventListener("click", () => {
            setLocationInfoContainer(location);
        })

        //const methodCall = "setLocationInputContainer"+"(\""+location.locationName+"\")"
        //row.setAttribute("onClick",methodCall);

        row.textContent = location.locationName;
        loacationList.appendChild(row)
    })

    // set default values for info container:
    setLocationInfoContainer(getLocationsAsObj()[0])
}

const locationInfoContainer = document.getElementById("location-info-container")

/**
 * changes the locationInputContainer to the clicked listelement
 * @param {*} locationName name of the location that shall be displayed
 */
function setLocationInputContainer(locationName){
    // remove old contant 
    while (locationInfoContainer.firstChild){
        locationInfoContainer.removeChild(locationInfoContainer.firstChild)
    }
    // add new 
    //add name
    getLocationsAsObj().forEach(location => {
        if (location.locationName == locationName) {
            const name = document.createElement("h3")
            name.innerText = location.locationName;
            locationInfoContainer.appendChild(name);
            // inner spanns
           const details = document.createElement("p")
            for(const key in location) {
                if (key != "locationName" && key != "description") {
                    const span = document.createElement("span");
                    span.innerText = key+": "+location[key];
                    details.appendChild(span)
                }
            }
            locationInfoContainer.appendChild(details)
            //describtion
            const des = document.createElement("p")
            des.innerText = location.description;
            locationInfoContainer.appendChild(des);
        }
    })
}

// -- die Funtkion oben hat bei mir nicht funktioniert und wollt sie nicht anfassen weil ich den Ansatz nicht ganz verstanden habe,
// -- meine Idee ist einfach, wir übergeben die Location (Click Event on Element in der Liste) und die Methode liest sich die Info aus dem Objekt und trägt sie ein
// -- dynamische Erstellung finde ich sehr umständlich hier, wir müssen bei jedem Click die bereits erstellten Elemente löschen bzw. deren Content ändern können
function setLocationInfoContainer(location) {

    let locationInfoTitel = document.getElementById("location-info-title-text")
    let locationInfoDes = document.getElementById("location-info-des-text")
    let locationInfoCo2 = document.getElementById("location-info-co2-text")

    locationInfoTitel.textContent = location.locationName
    locationInfoDes.textContent = "- " + location.description
    locationInfoCo2.textContent = "CO2 in T : " + location.c02InTons
}

/**
 * Wrapps all onload Functions 
 */
function onloadWrapper(){
    generateLocationList()
    generateUpdateTableBody()
}