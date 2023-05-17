'use strict';

const users = [{
    "userName": "admina",
    "password": "admina",
    "admin": true },
    {
    "userName": "user",
    "password": "user",
    "admin": false }];

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
addLocationBtn.addEventListener("click", addLocation)
backToHomepageBtn.addEventListener("click", backToHomePage)

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
    displayToggle(["main-page","login-area","header-options"])
}

function addLocation() {
    displayToggle(["main-page","header-options","add-location-page"])
}

function backToHomePage() {
    // reset all form inputs:
    document.getElementById("add-form").reset()
    // back to homepage:
    displayToggle(["add-location-page","main-page","header-options"])
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
function disableEnableElement(element) {
    if (document.getElementById(element).style.display!="none") {
        document.getElementById(element).style.display!="none"
    } else {
        document.getElementById(element).style.display!="block"
    }
}

function loginAsAdmin(){

    // Change Display:
    displayToggle(["login-area","header-options","main-page", "locations-options-btns"])
}

function loginAsUser() {

    // Change Display:
    displayToggle(["login-area","header-options","main-page"])
}