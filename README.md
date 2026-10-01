# 🏥 SmartCare AI

### AI-Powered Healthcare Assistance Platform

SmartCare AI is an AI-powered web application designed to provide
accessible and organized healthcare assistance through a single digital
platform.

The system integrates Artificial Intelligence, FastAPI, MongoDB, and
modern web technologies to provide AI chat assistance along with
healthcare management features.

---

## 📌 Overview

SmartCare AI provides a centralized platform for users to access
AI-powered healthcare assistance and manage essential healthcare-related
activities.

The application includes AI conversational assistance, appointment
management, medical records, medicine reminders, emergency support, and
user authentication.

> **Note:** SmartCare AI is an academic project developed for educational
> and demonstration purposes. It is not a replacement for professional
> medical advice or diagnosis.

---

## ✨ Key Features

### 🤖 AI Healthcare Assistant
- AI-powered conversational healthcare assistance
- Gemini API integration
- User chat history
- Interactive chat interface

### 📅 Appointment Management
- View scheduled appointments
- Manage appointment information
- User-specific appointment access

### 📋 Medical Records
- Access healthcare-related records
- Centralized record management
- User-specific medical information

### 💊 Medicine Reminders
- Medicine reminder management
- Organized medication schedule

### 🚨 Emergency Support
- Dedicated emergency assistance interface
- Quick access to emergency support

### 🔐 User Authentication
- Patient registration
- User login
- Secure API-based authentication

### 🗄️ Database Management
- MongoDB integration
- User data storage
- Chat history storage
- Application data management

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │        User         │
                    │     Web Browser     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Frontend       │
                    │   HTML / CSS / JS   │
                    └──────────┬──────────┘
                               │
                            REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │       FastAPI       │
                    │       Backend       │
                    └─────────┬───────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
             ┌─────────────┐     ┌─────────────┐
             │   MongoDB   │     │ Gemini API  │
             │   Database  │     │ AI Service  │
             └─────────────┘     └─────────────┘
