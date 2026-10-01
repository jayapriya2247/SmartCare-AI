// =========================
// AUTHENTICATION
// =========================

const token = localStorage.getItem("smartcare_token");
const userData = localStorage.getItem("smartcare_user");

if (!token || !userData) {
    window.location.href = "login.html";
}


// =========================
// LOAD PATIENT INFORMATION
// =========================

let user = null;

try {

    user = JSON.parse(userData);

    const patientName =
        document.getElementById("patientName");

    if (patientName) {
        patientName.textContent =
            user.name || "Patient";
    }

} catch (error) {

    console.error(
        "Unable to load user information:",
        error
    );

    localStorage.removeItem("smartcare_token");
    localStorage.removeItem("smartcare_user");

    window.location.href = "login.html";
}


// =========================
// LOGOUT
// =========================

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "smartcare_token"
            );

            localStorage.removeItem(
                "smartcare_user"
            );

            window.location.href =
                "login.html";
        }
    );

}