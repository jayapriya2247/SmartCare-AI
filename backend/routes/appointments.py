from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime, timezone

from database.db import appointments_collection

router = APIRouter(
    prefix="/api/appointments",
    tags=["Appointments"]
)


class AppointmentRequest(BaseModel):
    user_id: str
    doctor_name: str
    appointment_date: str
    appointment_time: str
    reason: str = ""


@router.post("/book")
def book_appointment(appointment: AppointmentRequest):

    if not appointment.doctor_name.strip():
        raise HTTPException(
            status_code=400,
            detail="Doctor name is required"
        )

    if not appointment.appointment_date.strip():
        raise HTTPException(
            status_code=400,
            detail="Appointment date is required"
        )

    if not appointment.appointment_time.strip():
        raise HTTPException(
            status_code=400,
            detail="Appointment time is required"
        )

    new_appointment = {
        "user_id": appointment.user_id,
        "doctor_name": appointment.doctor_name,
        "appointment_date": appointment.appointment_date,
        "appointment_time": appointment.appointment_time,
        "reason": appointment.reason,
        "status": "Booked",
        "created_at": datetime.now(timezone.utc)
    }

    result = appointments_collection.insert_one(
        new_appointment
    )

    return {
        "status": "success",
        "message": "Appointment booked successfully",
        "appointment_id": str(result.inserted_id)
    }
@router.get("/my/{user_id}")
def get_my_appointments(user_id: str):

    appointments = appointments_collection.find(
        {"user_id": user_id}
    ).sort(
        [
            ("appointment_date", 1),
            ("appointment_time", 1)
        ]
    )

    appointment_list = []

    for appointment in appointments:

        appointment_list.append({
            "id": str(appointment["_id"]),
            "doctor_name": appointment.get(
                "doctor_name",
                ""
            ),
            "appointment_date": appointment.get(
                "appointment_date",
                ""
            ),
            "appointment_time": appointment.get(
                "appointment_time",
                ""
            ),
            "reason": appointment.get(
                "reason",
                ""
            ),
            "status": appointment.get(
                "status",
                "Booked"
            )
        })

    return {
        "status": "success",
        "appointments": appointment_list
    }