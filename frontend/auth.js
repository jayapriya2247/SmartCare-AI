const API_BASE_URL = "http://127.0.0.1:8000";


// ========================================
// REGISTER
// ========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;

        const message = document.getElementById("registerMessage");

        message.textContent = "Creating account...";

        try {

            const response = await fetch(
                `${API_BASE_URL}/api/auth/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password,
                        phone: phone
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                message.textContent =
                    data.detail || "Registration failed.";

                return;
            }

            message.textContent =
                "Registration successful! Redirecting to login...";

            registerForm.reset();

            setTimeout(() => {

                window.location.href = "login.html";

            }, 1500);

        } catch (error) {

            console.error("Registration Error:", error);

            message.textContent =
                "Unable to connect to SmartCare AI server.";
        }

    });
}


// ========================================
// LOGIN
// ========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");

        message.textContent = "Logging in...";

        try {

            const response = await fetch(
                `${API_BASE_URL}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                message.textContent =
                    data.detail || "Login failed.";

                return;
            }

            // Save JWT token
            localStorage.setItem(
                "smartcare_token",
                data.token
            );

            // Save user information
            localStorage.setItem(
                "smartcare_user",
                JSON.stringify(data.user)
            );

            message.textContent =
                "Login successful!";

            setTimeout(() => {

                window.location.href = "dashboard.html";

            }, 1000);

        } catch (error) {

            console.error("Login Error:", error);

            message.textContent =
                "Unable to connect to SmartCare AI server.";
        }

    });
}