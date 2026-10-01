from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database.db import users_collection
from datetime import datetime, timedelta, timezone
import hashlib
import secrets
import jwt


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


SECRET_KEY = "smartcare-ai-secret-key-change-later"
ALGORITHM = "HS256"


# -----------------------------
# Request Models
# -----------------------------

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    phone: str = ""


class LoginRequest(BaseModel):
    email: str
    password: str


# -----------------------------
# Password Hashing
# -----------------------------

def hash_password(password: str, salt: str = None):

    if salt is None:
        salt = secrets.token_hex(16)

    password_hash = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        100000
    )

    return salt, password_hash.hex()


def verify_password(password: str, salt: str, stored_hash: str):

    _, password_hash = hash_password(password, salt)

    return secrets.compare_digest(
        password_hash,
        stored_hash
    )


# -----------------------------
# Register
# -----------------------------

@router.post("/register")
def register_user(user: RegisterRequest):

    existing_user = users_collection.find_one(
        {"email": user.email.lower()}
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    salt, password_hash = hash_password(user.password)

    new_user = {
        "name": user.name,
        "email": user.email.lower(),
        "phone": user.phone,
        "password_hash": password_hash,
        "password_salt": salt,
        "role": "patient",
        "created_at": datetime.now(timezone.utc)
    }

    result = users_collection.insert_one(new_user)

    return {
        "status": "success",
        "message": "Patient registered successfully",
        "user_id": str(result.inserted_id)
    }


# -----------------------------
# Login
# -----------------------------

@router.post("/login")
def login_user(user: LoginRequest):

    existing_user = users_collection.find_one(
        {"email": user.email.lower()}
    )

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    password_correct = verify_password(
        user.password,
        existing_user["password_salt"],
        existing_user["password_hash"]
    )

    if not password_correct:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    expiration = datetime.now(timezone.utc) + timedelta(hours=24)

    token = jwt.encode(
        {
            "user_id": str(existing_user["_id"]),
            "email": existing_user["email"],
            "role": existing_user["role"],
            "exp": expiration
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "status": "success",
        "message": "Login successful",
        "token": token,
        "user": {
            "id": str(existing_user["_id"]),
            "name": existing_user["name"],
            "email": existing_user["email"],
            "phone": existing_user["phone"],
            "role": existing_user["role"]
        }
    }