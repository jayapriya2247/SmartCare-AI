from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from datetime import datetime, timezone
from pathlib import Path
import shutil
import uuid

from bson import ObjectId

from database.db import medical_records_collection


router = APIRouter(
    prefix="/api/medical-records",
    tags=["Medical Records"]
)


# Upload folder
UPLOAD_DIR = Path("uploads/medical_records")

UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True
)


# =========================================================
# UPLOAD MEDICAL RECORD
# =========================================================

@router.post("/upload")
async def upload_medical_record(
    user_id: str = Form(...),
    record_name: str = Form(...),
    record_type: str = Form(...),
    file: UploadFile = File(...)
):

    if not user_id.strip():

        raise HTTPException(
            status_code=400,
            detail="User ID is required"
        )


    if not record_name.strip():

        raise HTTPException(
            status_code=400,
            detail="Record name is required"
        )


    if not file.filename:

        raise HTTPException(
            status_code=400,
            detail="Please select a file"
        )


    allowed_extensions = {
        ".pdf",
        ".jpg",
        ".jpeg",
        ".png",
        ".doc",
        ".docx"
    }


    original_extension = Path(
        file.filename
    ).suffix.lower()


    if original_extension not in allowed_extensions:

        raise HTTPException(
            status_code=400,
            detail="Unsupported file type"
        )


    unique_filename = (
        f"{uuid.uuid4()}"
        f"{original_extension}"
    )


    file_path = (
        UPLOAD_DIR /
        unique_filename
    )


    try:

        with open(
            file_path,
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )


        medical_record = {

            "user_id": user_id,

            "record_name":
                record_name.strip(),

            "record_type":
                record_type.strip(),

            "original_filename":
                file.filename,

            "stored_filename":
                unique_filename,

            "file_path":
                str(file_path),

            "content_type":
                file.content_type,

            "created_at":
                datetime.now(timezone.utc)

        }


        result = (
            medical_records_collection
            .insert_one(
                medical_record
            )
        )


        return {

            "status": "success",

            "message":
                "Medical record uploaded successfully",

            "record_id":
                str(result.inserted_id)

        }


    except Exception as error:

        print(
            "Medical Record Upload Error:",
            error
        )


        if file_path.exists():

            file_path.unlink()


        raise HTTPException(
            status_code=500,
            detail="Unable to upload medical record"
        )


# =========================================================
# GET MY MEDICAL RECORDS
# =========================================================

@router.get("/my/{user_id}")
def get_my_medical_records(
    user_id: str
):

    records = (
        medical_records_collection
        .find(
            {"user_id": user_id}
        )
        .sort(
            "created_at",
            -1
        )
    )


    record_list = []


    for record in records:

        record_list.append({

            "id":
                str(record["_id"]),

            "record_name":
                record.get(
                    "record_name",
                    ""
                ),

            "record_type":
                record.get(
                    "record_type",
                    ""
                ),

            "original_filename":
                record.get(
                    "original_filename",
                    ""
                ),

            "content_type":
                record.get(
                    "content_type",
                    ""
                ),

            "created_at":
                record.get(
                    "created_at"
                ).isoformat()
                if record.get("created_at")
                else ""

        })


    return {

        "status": "success",

        "records":
            record_list

    }


# =========================================================
# VIEW / DOWNLOAD MEDICAL FILE
# =========================================================

@router.get("/file/{record_id}")
def get_medical_file(
    record_id: str
):

    try:

        record = (
            medical_records_collection
            .find_one(
                {
                    "_id":
                        ObjectId(record_id)
                }
            )
        )

    except Exception:

        raise HTTPException(
            status_code=400,
            detail="Invalid record ID"
        )


    if not record:

        raise HTTPException(
            status_code=404,
            detail="Medical record not found"
        )


    file_path = Path(
        record.get(
            "file_path",
            ""
        )
    )


    if not file_path.exists():

        raise HTTPException(
            status_code=404,
            detail="Medical file not found"
        )


    return FileResponse(

        path=str(file_path),

        media_type=
            record.get(
                "content_type",
                "application/octet-stream"
            ),

        filename=
            record.get(
                "original_filename",
                file_path.name
            )

    )