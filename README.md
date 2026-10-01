# SmartCare AI

## AI-Powered Healthcare Assistance Platform

SmartCare AI is an AI-powered healthcare assistance web application designed to provide users with a simple and accessible platform for managing common healthcare-related activities.

The system combines an AI healthcare assistant with appointment management, medical records, medicine reminders, user authentication, and emergency assistance features.

---

## 📌 Project Overview

SmartCare AI brings multiple healthcare assistance features together in a single web application.

The main purpose of this project is to provide users with an easy-to-use platform for accessing AI assistance and managing healthcare-related information.

---

## 🎯 Objectives

The main objectives of SmartCare AI are:

- To develop an AI-powered healthcare assistance platform.
- To provide an interactive AI healthcare assistant.
- To manage healthcare-related appointments.
- To provide access to medical records.
- To help users manage medicine reminders.
- To provide quick emergency assistance.
- To store application data using MongoDB.
- To integrate Generative AI into a practical web application.
- To provide a simple and user-friendly healthcare interface.

---

# ✨ Features

### 1. AI Healthcare Assistant

SmartCare AI provides an AI-powered chat assistant that allows users to ask general healthcare-related questions.

The system uses the Google Gemini API to generate AI responses.

**Features:**
- Natural language interaction
- AI-generated responses
- Healthcare assistance
- Chat history
- Backend API integration

> The AI assistant provides general information and does not replace professional medical advice.

---

### 2. User Registration and Login

Users can create an account and log in to the application.

**Registration includes:**
- Name
- Email
- Password
- Phone number

Registered users can log in using their credentials.

---

### 3. Dashboard

The dashboard provides a central interface for accessing the main SmartCare AI modules.

Users can navigate to:

- AI Chat
- Appointments
- Medical Records
- Medicine Reminders
- Emergency Support

---

### 4. Appointment Management

The appointment module provides users with access to their scheduled doctor appointments.

This module organizes appointment-related information in one place.

---

### 5. Medical Records

The medical records module provides a dedicated section for healthcare-related records.

It can be extended to support:

- Medical reports
- Prescriptions
- Lab results
- Doctor notes
- Previous consultations

---

### 6. Medicine Reminders

The medicine reminder module helps users organize their medicine schedule.

Possible information includes:

- Medicine name
- Dosage
- Reminder time
- Frequency

---

### 7. Emergency Assistance

SmartCare AI provides an emergency assistance page for quick access to emergency support.

The application includes a **Call 112** option for emergency situations in India.

Users should contact appropriate emergency services or healthcare professionals when immediate assistance is required.

---

# 🛠️ Technology Used

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Python
- FastAPI
- Uvicorn

### Database

- MongoDB

### Artificial Intelligence

- Google Gemini API
- Generative AI

### Development Tools

- Visual Studio Code
- Git
- GitHub
- MongoDB

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │        User         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Web Frontend     │
                    │  HTML / CSS / JS    │
                    └──────────┬──────────┘
                               │
                         HTTP / REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   FastAPI Backend   │
                    │       Python        │
                    └──────┬───────┬──────┘
                           │       │
                ┌──────────┘       └──────────┐
                ▼                             ▼
       ┌──────────────────┐          ┌──────────────────┐
       │     MongoDB      │          │   Gemini API     │
       │     Database     │          │   Generative AI  │
       └──────────────────┘          └──────────────────┘
📂 Project Structure
SmartCare-AI/
│
├── backend/
│   ├── ai/
│   ├── database/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── dashboard.html
│   ├── ai-chat.html
│   ├── appointments.html
│   ├── medical-records.html
│   ├── medicine-reminders.html
│   ├── emergency.html
│   ├── css/
│   └── js/
│
├── .gitignore
├── README.md
└── ...

Do not upload the venv/ folder or .env file to GitHub.

💻 Requirements

Before running SmartCare AI, install:

Python 3.12 or later
MongoDB
Git
Visual Studio Code
Modern web browser
Google Gemini API key
🚀 How to Run the Project

Follow these steps to run SmartCare AI on Windows.

Step 1: Clone the Repository

Open PowerShell or Command Prompt:

git clone https://github.com/jayapriya2247/SmartCare-AI.git

Move into the project folder:

cd SmartCare-AI
Step 2: Open the Project in VS Code
code .
Step 3: Create Virtual Environment

From the project root:

python -m venv venv
Step 4: Activate Virtual Environment

On Windows PowerShell:

venv\Scripts\activate

After activation:

(venv) PS C:\SmartCare-AI>
Step 5: Install Backend Dependencies

Move into the backend folder:

cd backend

Install dependencies:

pip install -r requirements.txt
Step 6: Configure Environment Variables

Inside:

C:\SmartCare-AI\backend

create:

.env

Add:

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
MONGODB_URL=mongodb://localhost:27017

Replace YOUR_GEMINI_API_KEY with your actual Gemini API key.

Important

Never upload .env to GitHub.

Your .gitignore should contain:

.env
backend/.env
venv/
__pycache__/
*.pyc
Step 7: Start MongoDB

Make sure MongoDB is installed and running.

Default MongoDB connection:

mongodb://localhost:27017
Step 8: Start the FastAPI Backend

Make sure you are inside:

C:\SmartCare-AI\backend

If required, activate the virtual environment:

..\venv\Scripts\activate

Start the backend:

python -m uvicorn main:app --reload

Backend URL:

http://127.0.0.1:8000
Step 9: Open Swagger API Documentation

Open:

http://127.0.0.1:8000/docs

Swagger allows you to test the available backend APIs.

Step 10: Start the Frontend

Open a new terminal without stopping the backend.

Run:

cd C:\SmartCare-AI\frontend

Then:

python -m http.server 5500
Step 11: Open the Application

Open your browser and visit:

http://127.0.0.1:5500

SmartCare AI should now be running.

▶️ Quick Run Commands
Terminal 1 - Backend
cd C:\SmartCare-AI
venv\Scripts\activate
cd backend
python -m uvicorn main:app --reload

Backend:

http://127.0.0.1:8000

Swagger:

http://127.0.0.1:8000/docs
Terminal 2 - Frontend
cd C:\SmartCare-AI\frontend
python -m http.server 5500

Frontend:

http://127.0.0.1:5500
🧪 Testing the Backend

Open:

http://127.0.0.1:8000/docs

Testing process:

1. Open Swagger
2. Select an API endpoint
3. Click "Try it out"
4. Enter the required information
5. Click "Execute"
6. Check the response
🤖 Gemini AI Integration

SmartCare AI uses the Google Gemini API to provide AI-powered responses.

The API key is stored inside the backend .env file.

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

The API key should never be:

Hard-coded in frontend files
Uploaded to GitHub
Shared publicly
🗄️ Database

SmartCare AI uses MongoDB as its database.

MongoDB is used to store application-related information.

The database connection is configured using the .env file.

mongodb://localhost:27017
🔐 Security

SmartCare AI follows basic security practices:

Environment variables for API keys
.env excluded from Git
Backend API separation
Database-based user information
Sensitive credentials are not stored in frontend code
🔄 Application Flow
User
 │
 ▼
SmartCare AI Frontend
 │
 ├── Register / Login
 │
 ├── Dashboard
 │
 ├── AI Healthcare Assistant
 │
 ├── Appointments
 │
 ├── Medical Records
 │
 ├── Medicine Reminders
 │
 └── Emergency Support
          │
          ▼
     FastAPI Backend
          │
      ┌───┴────┐
      ▼        ▼
   MongoDB  Gemini API
🔮 Future Enhancements

Future versions of SmartCare AI can include:

Doctor appointment booking
Online doctor consultation
Video consultation
Voice-based AI assistant
Multilingual AI healthcare assistant
Push notifications
Medicine reminder notifications
Health report upload
AI-based report summarization
Doctor and patient dashboards
Role-based access control
Mobile application
Cloud deployment
⚠️ Disclaimer

SmartCare AI is developed as an academic project for healthcare assistance.

The AI-generated information should not be considered a substitute for professional medical diagnosis, treatment, or emergency medical care.

Users should consult qualified healthcare professionals for medical decisions.

📌 Project Information

Project Name: SmartCare AI

Project Type: AI-Powered Healthcare Assistance Platform

Domain: Artificial Intelligence / Healthcare Technology

Frontend: HTML, CSS, JavaScript

Backend: Python, FastAPI

Database: MongoDB

AI: Google Gemini API

Version Control: Git & GitHub

👩‍💻 Developer

Jayapriya P

B.Tech Artificial Intelligence and Data Science

Dr. N.G.P. Institute of Technology

Coimbatore, Tamil Nadu, India

⭐ GitHub Repository

https://github.com/jayapriya2247/SmartCare-AI

📄 License

This project is developed for educational and academic purposes.

⭐ SmartCare AI
AI-powered assistance for a smarter healthcare experience.
