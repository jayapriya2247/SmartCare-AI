// ========================================
// CHECK LOGIN
// ========================================

const token = localStorage.getItem("smartcare_token");
const userData = localStorage.getItem("smartcare_user");


// If user is not logged in
if (!token || !userData) {
    window.location.href = "login.html";
}


// ========================================
// LOAD USER INFORMATION
// ========================================

try {

    const user = JSON.parse(userData);

    document.getElementById("patientName").textContent =
        user.name || "Patient";

    document.getElementById("welcomeName").textContent =
        user.name || "Patient";

    document.getElementById("infoName").textContent =
        user.name || "-";

    document.getElementById("infoEmail").textContent =
        user.email || "-";

    document.getElementById("infoPhone").textContent =
        user.phone || "-";

    document.getElementById("infoRole").textContent =
        user.role || "patient";

} catch (error) {

    console.error(
        "Unable to load user information:",
        error
    );

}


// ========================================
// LOGOUT
// ========================================

const logoutButton =
    document.getElementById("logoutBtn");

logoutButton.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "smartcare_token"
        );

        localStorage.removeItem(
            "smartcare_user"
        );

        window.location.href = "login.html";

    }
);