const API_BASE_URL = "http://127.0.0.1:8000";

const token = localStorage.getItem("smartcare_token");
const userData = localStorage.getItem("smartcare_user");


// ================= AUTH CHECK =================

if (!token || !userData) {
    window.location.href = "login.html";
}


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


// ================= ELEMENTS =================

const appointmentForm =
    document.getElementById("appointmentForm");

const bookBtn =
    document.getElementById("bookBtn");

const messageBox =
    document.getElementById("message");

const appointmentsList =
    document.getElementById("appointmentsList");

const refreshBtn =
    document.getElementById("refreshAppointmentsBtn");


// ================= BOOK APPOINTMENT =================

appointmentForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const doctorName =
            document.getElementById("doctorName").value.trim();

        const appointmentDate =
            document.getElementById("appointmentDate").value;

        const appointmentTime =
            document.getElementById("appointmentTime").value;

        const reason =
            document.getElementById("reason").value.trim();


        if (!doctorName || !appointmentDate || !appointmentTime) {

            showMessage(
                "Please fill all required fields.",
                "error"
            );

            return;
        }


        bookBtn.disabled = true;
        bookBtn.textContent = "Booking...";


        try {

            const response = await fetch(
                `${API_BASE_URL}/api/appointments/book`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify({

                        user_id: user.id,

                        doctor_name: doctorName,

                        appointment_date: appointmentDate,

                        appointment_time: appointmentTime,

                        reason: reason

                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                showMessage(
                    data.detail ||
                    "Unable to book appointment.",
                    "error"
                );

                return;
            }


            showMessage(
                "Appointment booked successfully! 📅",
                "success"
            );


            appointmentForm.reset();


            // Reload appointment list
            loadAppointments();


        } catch (error) {

            console.error(
                "Appointment Error:",
                error
            );

            showMessage(
                "Unable to connect to SmartCare AI server. Please make sure the backend is running.",
                "error"
            );


        } finally {

            bookBtn.disabled = false;

            bookBtn.textContent =
                "📅 Book Appointment";

        }

    }
);


// ================= LOAD APPOINTMENTS =================

async function loadAppointments() {

    appointmentsList.innerHTML = `
        <div class="loading-message">
            Loading appointments...
        </div>
    `;


    try {

        const response = await fetch(
            `${API_BASE_URL}/api/appointments/my/${user.id}`,
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        const data = await response.json();


        if (!response.ok) {

            appointmentsList.innerHTML = `
                <div class="error-message">
                    ${data.detail || "Unable to load appointments."}
                </div>
            `;

            return;
        }


        const appointments =
            data.appointments || [];


        if (appointments.length === 0) {

            appointmentsList.innerHTML = `
                <div class="empty-message">
                    You don't have any appointments yet.
                </div>
            `;

            return;
        }


        appointmentsList.innerHTML = "";


        appointments.forEach(
            function (appointment) {

                const appointmentDiv =
                    document.createElement("div");

                appointmentDiv.className =
                    "appointment-item";


                appointmentDiv.innerHTML = `

                    <div class="appointment-info">

                        <h3>
                            👨‍⚕️ ${escapeHtml(
                                appointment.doctor_name
                            )}
                        </h3>

                        <p>
                            📅 ${escapeHtml(
                                appointment.appointment_date
                            )}
                        </p>

                        <p>
                            🕐 ${escapeHtml(
                                appointment.appointment_time
                            )}
                        </p>

                        <p>
                            📝 ${
                                appointment.reason
                                    ? escapeHtml(
                                        appointment.reason
                                      )
                                    : "No reason provided"
                            }
                        </p>

                    </div>


                    <div class="appointment-status">

                        ${escapeHtml(
                            appointment.status
                        )}

                    </div>

                `;


                appointmentsList.appendChild(
                    appointmentDiv
                );

            }
        );


    } catch (error) {

        console.error(
            "Load Appointments Error:",
            error
        );


        appointmentsList.innerHTML = `
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

function showMessage(text, type) {

    messageBox.textContent = text;

    messageBox.className =
        `message ${type}`;
}


// ================= REFRESH =================

refreshBtn.addEventListener(
    "click",
    loadAppointments
);


// ================= LOGOUT =================

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


// ================= INITIAL LOAD =================

loadAppointments();