from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.db import client
from routes.auth import router as auth_router
from routes.chat import router as chat_router
from routes.appointments import router as appointments_router
from routes.medical_records import router as medical_records_router
from routes.medicine_reminders import router as medicine_reminders_router
app = FastAPI(
    title="SmartCare AI",
    description="AI-Powered Healthcare Assistance & Patient Management System",
    version="1.0.0"
)


# -----------------------------
# CORS Configuration
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Home Route
# -----------------------------

@app.get("/")
def root():
    return {
        "message": "SmartCare AI Backend Running Successfully"
    }


# -----------------------------
# Health Check
# -----------------------------

@app.get("/api/health")
def health_check():

    try:
        client.admin.command("ping")

        return {
            "status": "success",
            "message": "SmartCare AI API and MongoDB are working"
        }

    except Exception as error:

        return {
            "status": "error",
            "message": str(error)
        }


# -----------------------------
# Authentication Routes
# -----------------------------

app.include_router(auth_router)
app.include_router(chat_router)
app.include_router(appointments_router)
app.include_router(medical_records_router)
app.include_router(medicine_reminders_router)