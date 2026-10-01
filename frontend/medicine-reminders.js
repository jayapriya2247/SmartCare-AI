const API_BASE_URL = "http://127.0.0.1:8000";


// ================= AUTH =================

const token = localStorage.getItem("smartcare_token");
const userData = localStorage.getItem("smartcare_user");

if (!token || !userData) {
    window.location.href = "login.html";
}


let user = null;

try {

    user = JSON.parse(userData);

    document.getElementById("patientName").textContent =
        user.name || "Patient";

} catch (error) {

    console.error(
        "Unable to load user:",
        error
    );

    localStorage.removeItem("smartcare_token");
    localStorage.removeItem("smartcare_user");

    window.location.href = "login.html";
}


// ================= ELEMENTS =================

const reminderForm =
    document.getElementById(
        "reminderForm"
    );

const addReminderBtn =
    document.getElementById(
        "addReminderBtn"
    );

const messageBox =
    document.getElementById(
        "message"
    );

const remindersList =
    document.getElementById(
        "remindersList"
    );

const refreshRemindersBtn =
    document.getElementById(
        "refreshRemindersBtn"
    );


// ================= ADD REMINDER =================

reminderForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const medicineName =
            document.getElementById(
                "medicineName"
            ).value.trim();


        const dosage =
            document.getElementById(
                "dosage"
            ).value.trim();


        const reminderTime =
            document.getElementById(
                "reminderTime"
            ).value;


        const startDate =
            document.getElementById(
                "startDate"
            ).value;


        const endDate =
            document.getElementById(
                "endDate"
            ).value;


        const instructions =
            document.getElementById(
                "instructions"
            ).value.trim();


        if (
            !medicineName ||
            !reminderTime ||
            !startDate
        ) {

            showMessage(
                "Please fill all required fields.",
                "error"
            );

            return;
        }


        if (
            endDate &&
            endDate < startDate
        ) {

            showMessage(
                "End date cannot be before start date.",
                "error"
            );

            return;
        }


        addReminderBtn.disabled = true;

        addReminderBtn.textContent =
            "Adding...";


        try {

            const response =
                await fetch(
                    `${API_BASE_URL}/api/reminders/add`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`
                        },

                        body: JSON.stringify({

                            user_id:
                                user.id,

                            medicine_name:
                                medicineName,

                            dosage:
                                dosage,

                            reminder_time:
                                reminderTime,

                            start_date:
                                startDate,

                            end_date:
                                endDate,

                            instructions:
                                instructions

                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                showMessage(
                    data.detail ||
                    "Unable to add medicine reminder.",
                    "error"
                );

                return;
            }


            showMessage(
                "Medicine reminder added successfully! 💊",
                "success"
            );


            reminderForm.reset();


            loadReminders();


        } catch (error) {

            console.error(
                "Add Reminder Error:",
                error
            );


            showMessage(
                "Unable to connect to SmartCare AI server. Please make sure the backend is running.",
                "error"
            );

        } finally {

            addReminderBtn.disabled = false;

            addReminderBtn.textContent =
                "💊 Add Reminder";
        }

    }
);


// ================= LOAD REMINDERS =================

async function loadReminders() {

    remindersList.innerHTML = `
        <div class="loading-message">
            Loading medicine reminders...
        </div>
    `;


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/api/reminders/my/${user.id}`,
                {
                    method: "GET",

                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            remindersList.innerHTML = `
                <div class="error-message">
                    ${
                        data.detail ||
                        "Unable to load medicine reminders."
                    }
                </div>
            `;

            return;
        }


        const reminders =
            data.reminders || [];


        if (reminders.length === 0) {

            remindersList.innerHTML = `
                <div class="empty-message">
                    You don't have any medicine reminders yet.
                </div>
            `;

            return;
        }


        remindersList.innerHTML = "";


        reminders.forEach(
            function (reminder) {

                const reminderDiv =
                    document.createElement(
                        "div"
                    );


                reminderDiv.className =
                    "reminder-item";


                reminderDiv.innerHTML = `

                    <div class="reminder-info">

                        <h3>
                            💊 ${escapeHtml(
                                reminder.medicine_name
                            )}
                        </h3>

                        <p>
                            💉 Dosage:
                            ${
                                reminder.dosage
                                    ? escapeHtml(
                                        reminder.dosage
                                      )
                                    : "Not specified"
                            }
                        </p>

                        <p>
                            ⏰ Time:
                            ${escapeHtml(
                                reminder.reminder_time
                            )}
                        </p>

                        <p>
                            📅 Start:
                            ${escapeHtml(
                                reminder.start_date
                            )}
                        </p>

                        <p>
                            📅 End:
                            ${
                                reminder.end_date
                                    ? escapeHtml(
                                        reminder.end_date
                                      )
                                    : "Not specified"
                            }
                        </p>

                        <p>
                            📝 Instructions:
                            ${
                                reminder.instructions
                                    ? escapeHtml(
                                        reminder.instructions
                                      )
                                    : "No instructions"
                            }
                        </p>

                    </div>


                    <div class="reminder-status">

                        ${escapeHtml(
                            reminder.status
                        )}

                    </div>

                `;


                remindersList.appendChild(
                    reminderDiv
                );

            }
        );


    } catch (error) {

        console.error(
            "Load Reminders Error:",
            error
        );


        remindersList.innerHTML = `
            <div class="error-message">
                Unable to connect to SmartCare AI server.
            </div>
        `;
    }
}


// ================= ESCAPE HTML =================

function escapeHtml(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text || "";


    return div.innerHTML;
}


// ================= MESSAGE =================

function showMessage(
    text,
    type
) {

    messageBox.textContent =
        text;


    messageBox.className =
        `message ${type}`;
}


// ================= REFRESH =================

refreshRemindersBtn.addEventListener(
    "click",
    loadReminders
);


// ================= LOGOUT =================

document.getElementById(
    "logoutBtn"
).addEventListener(
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


// ================= INITIAL LOAD =================

loadReminders();