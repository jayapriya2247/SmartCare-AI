from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime, timezone

from ai.gemini import ask_gemini
from database.db import chat_history_collection


router = APIRouter(
    prefix="/api/chat",
    tags=["AI Health Assistant"]
)


class ChatRequest(BaseModel):
    user_id: str
    message: str


@router.post("")
def chat_with_ai(request: ChatRequest):

    if not request.message.strip():
        raise HTTPException(
            status_code=400,
            detail="Message cannot be empty"
        )

    try:

        # Ask Gemini
        ai_response = ask_gemini(request.message)

        # Save conversation in MongoDB
        chat_record = {
            "user_id": request.user_id,
            "user_message": request.message,
            "ai_response": ai_response,
            "created_at": datetime.now(timezone.utc)
        }

        chat_history_collection.insert_one(chat_record)

        return {
            "status": "success",
            "message": request.message,
            "response": ai_response
        }

    except Exception as error:

        print("Chat API Error:", error)

        raise HTTPException(
            status_code=500,
            detail="Unable to process your request"
        )