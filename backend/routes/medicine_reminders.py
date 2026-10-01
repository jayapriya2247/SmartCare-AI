from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime, timezone

from database.db import reminders_collection


router = APIRouter(
    prefix="/api/reminders",
    tags=["Medicine Reminders"]
)


# =========================================================
# REQUEST MODEL
# =========================================================

class ReminderRequest(BaseModel):

    user_id: str

    medicine_name: str

    dosage: str = ""

    reminder_time: str

    start_date: str

    end_date: str = ""

    instructions: str = ""


# =========================================================
# ADD MEDICINE REMINDER
# =========================================================

@router.post("/add")
def add_reminder(
    reminder: ReminderRequest
):

    if not reminder.user_id.strip():

        raise HTTPException(
            status_code=400,
            detail="User ID is required"
        )


    if not reminder.medicine_name.strip():

        raise HTTPException(
            status_code=400,
            detail="Medicine name is required"
        )


    if not reminder.reminder_time.strip():

        raise HTTPException(
            status_code=400,
            detail="Reminder time is required"
        )


    if not reminder.start_date.strip():

        raise HTTPException(
            status_code=400,
            detail="Start date is required"
        )


    new_reminder = {

        "user_id":
            reminder.user_id,

        "medicine_name":
            reminder.medicine_name.strip(),

        "dosage":
            reminder.dosage.strip(),

        "reminder_time":
            reminder.reminder_time.strip(),

        "start_date":
            reminder.start_date.strip(),

        "end_date":
            reminder.end_date.strip(),

        "instructions":
            reminder.instructions.strip(),

        "status":
            "Active",

        "created_at":
            datetime.now(timezone.utc)

    }


    result = (
        reminders_collection
        .insert_one(
            new_reminder
        )
    )


    return {

        "status":
            "success",

        "message":
            "Medicine reminder added successfully",

        "reminder_id":
            str(result.inserted_id)

    }


# =========================================================
# GET MY MEDICINE REMINDERS
# =========================================================

@router.get("/my/{user_id}")
def get_my_reminders(
    user_id: str
):

    reminders = (
        reminders_collection
        .find(
            {
                "user_id":
                    user_id
            }
        )
        .sort(
            [
                (
                    "start_date",
                    1
                ),

                (
                    "reminder_time",
                    1
                )
            ]
        )
    )


    reminder_list = []


    for reminder in reminders:

        reminder_list.append({

            "id":
                str(
                    reminder["_id"]
                ),

            "medicine_name":
                reminder.get(
                    "medicine_name",
                    ""
                ),

            "dosage":
                reminder.get(
                    "dosage",
                    ""
                ),

            "reminder_time":
                reminder.get(
                    "reminder_time",
                    ""
                ),

            "start_date":
                reminder.get(
                    "start_date",
                    ""
                ),

            "end_date":
                reminder.get(
                    "end_date",
                    ""
                ),

            "instructions":
                reminder.get(
                    "instructions",
                    ""
                ),

            "status":
                reminder.get(
                    "status",
                    "Active"
                )

        })


    return {

        "status":
            "success",

        "reminders":
            reminder_list

    }