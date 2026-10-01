const API_BASE_URL = "http://127.0.0.1:8000";


// ========================================
// CHECK LOGIN
// ========================================

const token = localStorage.getItem("smartcare_token");
const userData = localStorage.getItem("smartcare_user");

if (!token || !userData) {
    window.location.href = "login.html";
}


// ========================================
// LOAD USER
// ========================================

let user = null;

try {

    user = JSON.parse(userData);

    document.getElementById("patientName").textContent =
        user.name || "Patient";

} catch (error) {

    console.error("Unable to load user:", error);

    localStorage.removeItem("smartcare_token");
    localStorage.removeItem("smartcare_user");

    window.location.href = "login.html";
}


// ========================================
// ELEMENTS
// ========================================

const chatMessages =
    document.getElementById("chatMessages");

const messageInput =
    document.getElementById("messageInput");

const sendBtn =
    document.getElementById("sendBtn");


// ========================================
// ADD MESSAGE
// ========================================

function addMessage(message, type) {

    const messageDiv =
        document.createElement("div");

    messageDiv.className =
        `message ${type}-message`;

    const avatar =
        type === "user" ? "👤" : "🤖";

    const name =
        type === "user" ? "You" : "SmartCare AI";

    messageDiv.innerHTML = `
        <div class="message-avatar">
            ${avatar}
        </div>

        <div class="message-content">

            <strong>${name}</strong>

            <p>${escapeHtml(message)}</p>

        </div>
    `;

    chatMessages.appendChild(messageDiv);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


// ========================================
// ESCAPE HTML
// ========================================

function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ========================================
// SEND MESSAGE
// ========================================

async function sendMessage() {

    const message =
        messageInput.value.trim();

    if (!message) {
        return;
    }

    addMessage(message, "user");

    messageInput.value = "";

    sendBtn.disabled = true;

    sendBtn.textContent = "Sending...";


    // Temporary loading message

    const loadingDiv =
        document.createElement("div");

    loadingDiv.className =
        "message ai-message";

    loadingDiv.innerHTML = `
        <div class="message-avatar">
            🤖
        </div>

        <div class="message-content">

            <strong>SmartCare AI</strong>

            <p>Thinking...</p>

        </div>
    `;

    chatMessages.appendChild(loadingDiv);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;


    try {

        const response =
            await fetch(`${API_BASE_URL}/api/chat`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    user_id: user.id,

                    message: message

                })

            });


        const data =
            await response.json();


        // Remove loading message

        loadingDiv.remove();


        if (!response.ok) {

            addMessage(
                data.detail || "Something went wrong.",
                "ai"
            );

            return;
        }


        addMessage(
            data.response,
            "ai"
        );


    } catch (error) {

        console.error(
            "Chat Error:",
            error
        );

        loadingDiv.remove();

        addMessage(
            "Unable to connect to SmartCare AI server. Please make sure the backend is running.",
            "ai"
        );

    } finally {

        sendBtn.disabled = false;

        sendBtn.textContent = "Send ➤";

        messageInput.focus();

    }
}


// ========================================
// SEND BUTTON
// ========================================

sendBtn.addEventListener(
    "click",
    sendMessage
);


// ========================================
// ENTER KEY
// ========================================

messageInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


// ========================================
// LOGOUT
// ========================================

document.getElementById("logoutBtn")
    .addEventListener(
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