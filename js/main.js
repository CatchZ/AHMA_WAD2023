// Events-Targets:
const loginBtn = document.getElementById("login-btn")
const logoutBtn = document.getElementById("logout-btn")
const addLocationBtn = document.getElementById("add-location-btn")
const listUpdateBtn = document.getElementById("locations-list-update-btn")
const saveNewLocationBtn = document.getElementById("save-new-location-btn")
const cancelAddLocationBtn = document.getElementById("cancel-location-add-btn")
const saveLocationUpdateBtn = document.getElementById("save-location-update-btn")
const cancelLocationUpdateBtn = document.getElementById("cancel-location-update-btn")
// TODO get delete&update Buttons for each Element (querySelector() onClick "event" as target obj ?)

// Events-Handlers:
loginBtn.addEventListener("click", login)

// Events-Handling Functions:
function login() {
    alert("just a test")
    // TODO
}

function logout() {
   // TODO
}

function addLocation() {
    // TODO
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

function loginAsAdmin() {
    // TODO
}

function loginAsUser() {
    // TODO
}