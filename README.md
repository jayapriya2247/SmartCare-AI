# 🏥 SmartCare AI

An AI-powered **Healthcare Assistance Platform** developed using **HTML, CSS, JavaScript, Python, FastAPI, MongoDB, and Google Gemini API**. The application provides users with AI healthcare assistance, appointment management, medical records, medicine reminders, and emergency support through a simple and user-friendly interface.

---

## 🚀 Features

- 🔐 User Registration and Login
- 🤖 AI-Powered Healthcare Assistant
- 💬 AI Chat Support
- 📅 Appointment Management
- 📋 Medical Records
- 💊 Medicine Reminders
- 🚨 Emergency Assistance
- 📊 User Dashboard
- 💾 MongoDB Database Integration
- 🧠 Google Gemini API Integration

---

## 🛠️ Technologies Used

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

### AI

- Google Gemini API
- Generative AI

### Tools

- Visual Studio Code
- Git
- GitHub

---

## 📂 Project Structure

```text
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
├── README.md
└── .gitignore
The .env file should not be uploaded to GitHub.

▶️ How to Run
1️⃣ Clone the Repository
git clone https://github.com/jayapriya2247/SmartCare-AI.git
2️⃣ Navigate to the Project Folder
cd SmartCare-AI
3️⃣ Create a Virtual Environment
python -m venv venv
4️⃣ Activate the Virtual Environment

On Windows:

venv\Scripts\activate
5️⃣ Navigate to the Backend Folder
cd backend
6️⃣ Install Dependencies
pip install -r requirements.txt
7️⃣ Configure Environment Variables

Create a .env file inside the backend folder and add:

GEMINI_API_KEY=your_gemini_api_key
MONGODB_URL=mongodb://localhost:27017
8️⃣ Start MongoDB

Make sure MongoDB is installed and running on your system.

Default MongoDB connection:

mongodb://localhost:27017
9️⃣ Start the Backend Server
python -m uvicorn main:app --reload

Backend will run at:

http://127.0.0.1:8000
🔟 Open Swagger API Documentation

Open:

http://127.0.0.1:8000/docs
1️⃣1️⃣ Run the Frontend

Open a new terminal and run:

cd C:\SmartCare-AI\frontend

Then start the frontend server:

python -m http.server 5500

Open the application in your browser:

http://127.0.0.1:5500
🔑 Environment Variables

Create:

backend/.env

Add:

GEMINI_API_KEY=your_gemini_api_key
MONGODB_URL=mongodb://localhost:27017

Do not upload the .env file to GitHub because it contains sensitive credentials.

🧪 API Testing

The backend APIs can be tested using FastAPI Swagger UI.

Open:

http://127.0.0.1:8000/docs

You can test the available API endpoints directly from the Swagger interface.

🔮 Future Enhancements
👨‍⚕️ Doctor Appointment Booking
📹 Online Video Consultation
🎙️ Voice-Based AI Assistant
🌐 Multilingual Healthcare Assistant
🔔 Medicine Notifications
📄 Medical Report Upload
🧠 AI-Based Medical Report Summarization
📱 Mobile Application
☁️ Cloud Deployment
⚠️ Disclaimer

SmartCare AI is developed for academic and educational purposes.

The AI-generated information is intended for general healthcare assistance and should not be considered a substitute for professional medical diagnosis, treatment, or emergency medical care.

👩‍💻 Author

Jayapriya P

B.Tech Artificial Intelligence and Data Science

Dr. N.G.P. Institute of Technology

Coimbatore, Tamil Nadu, India

GitHub: https://github.com/jayapriya2247

📄 License

This project is created for learning and educational purposes.

⭐ SmartCare AI

AI-powered assistance for a smarter healthcare experience.
