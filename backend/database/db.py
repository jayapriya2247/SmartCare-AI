from pymongo import MongoClient

# MongoDB connection
MONGO_URL = "mongodb://localhost:27017"

client = MongoClient(MONGO_URL)

# SmartCare AI database
database = client["smartcareAI"]

# Collections
users_collection = database["users"]
appointments_collection = database["appointments"]
medical_records_collection = database["medical_records"]
reminders_collection = database["reminders"]
chat_history_collection = database["chat_history"]

print("MongoDB connected successfully!")