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

const medicalRecordForm =
    document.getElementById(
        "medicalRecordForm"
    );

const uploadBtn =
    document.getElementById(
        "uploadBtn"
    );

const messageBox =
    document.getElementById(
        "message"
    );

const recordsList =
    document.getElementById(
        "recordsList"
    );

const refreshRecordsBtn =
    document.getElementById(
        "refreshRecordsBtn"
    );


// ================= UPLOAD RECORD =================

medicalRecordForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const recordName =
            document.getElementById(
                "recordName"
            ).value.trim();


        const recordType =
            document.getElementById(
                "recordType"
            ).value;


        const fileInput =
            document.getElementById(
                "medicalFile"
            );


        const file =
            fileInput.files[0];


        if (
            !recordName ||
            !recordType ||
            !file
        ) {

            showMessage(
                "Please fill all fields and select a file.",
                "error"
            );

            return;
        }


        uploadBtn.disabled = true;

        uploadBtn.textContent =
            "Uploading...";


        const formData =
            new FormData();


        formData.append(
            "user_id",
            user.id
        );


        formData.append(
            "record_name",
            recordName
        );


        formData.append(
            "record_type",
            recordType
        );


        formData.append(
            "file",
            file
        );


        try {

            const response =
                await fetch(
                    `${API_BASE_URL}/api/medical-records/upload`,
                    {
                        method: "POST",

                        headers: {
                            "Authorization":
                                `Bearer ${token}`
                        },

                        body: formData
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                showMessage(
                    data.detail ||
                    "Unable to upload medical record.",
                    "error"
                );

                return;
            }


            showMessage(
                "Medical record uploaded successfully! 📄",
                "success"
            );


            medicalRecordForm.reset();


            loadMedicalRecords();


        } catch (error) {

            console.error(
                "Medical Record Upload Error:",
                error
            );


            showMessage(
                "Unable to connect to SmartCare AI server. Please make sure the backend is running.",
                "error"
            );

        } finally {

            uploadBtn.disabled = false;

            uploadBtn.textContent =
                "📤 Upload Record";
        }

    }
);


// ================= LOAD RECORDS =================

async function loadMedicalRecords() {

    recordsList.innerHTML = `
        <div class="loading-message">
            Loading medical records...
        </div>
    `;


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/api/medical-records/my/${user.id}`,
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

            recordsList.innerHTML = `
                <div class="error-message">
                    ${
                        data.detail ||
                        "Unable to load medical records."
                    }
                </div>
            `;

            return;
        }


        const records =
            data.records || [];


        if (records.length === 0) {

            recordsList.innerHTML = `
                <div class="empty-message">
                    You don't have any medical records yet.
                </div>
            `;

            return;
        }


        recordsList.innerHTML = "";


        records.forEach(
            function (record) {

                const recordDiv =
                    document.createElement(
                        "div"
                    );


                recordDiv.className =
                    "record-item";


                recordDiv.innerHTML = `

                    <div class="record-info">

                        <h3>
                            📄 ${escapeHtml(
                                record.record_name
                            )}
                        </h3>

                        <p>
                            📁 File:
                            ${escapeHtml(
                                record.original_filename
                            )}
                        </p>

                        <p>
                            📅 Uploaded:
                            ${formatDate(
                                record.created_at
                            )}
                        </p>

                        <span class="record-type">
                            ${escapeHtml(
                                record.record_type
                            )}
                        </span>

                    </div>


                    <a
                        class="record-file"
                        href="${API_BASE_URL}/api/medical-records/file/${record.id}"
                        target="_blank"
                    >
                        👁 View File
                    </a>

                `;


                recordsList.appendChild(
                    recordDiv
                );

            }
        );


    } catch (error) {

        console.error(
            "Load Medical Records Error:",
            error
        );


        recordsList.innerHTML = `
            <div class="error-message">
                Unable to connect to SmartCare AI server.
            </div>
        `;
    }
}


// ================= FORMAT DATE =================

function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }


    try {

        const date =
            new Date(dateString);


        return date.toLocaleString();

    } catch (error) {

        return dateString;
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

refreshRecordsBtn.addEventListener(
    "click",
    loadMedicalRecords
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

loadMedicalRecords();