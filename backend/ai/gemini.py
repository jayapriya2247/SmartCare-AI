import os
import time

from dotenv import load_dotenv
from google import genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not configured in .env")

client = genai.Client(
    api_key=GEMINI_API_KEY
)


def ask_gemini(question: str) -> str:

    system_instruction = """
You are SmartCare AI, a healthcare information assistant.

Your role:
- Provide general healthcare information.
- Explain health topics in simple language.
- Provide general wellness and prevention information.
- Encourage users to consult a qualified healthcare professional when appropriate.

Important safety rules:
- Do not claim to diagnose diseases.
- Do not prescribe medicines.
- Do not provide specific treatment plans.
- Do not replace a doctor or emergency medical service.
- If the user describes an emergency, advise them to seek immediate professional medical help.

Keep answers clear, helpful, and reasonably concise.
"""

    prompt = f"""
{system_instruction}

Patient's question:

{question}

Provide a helpful general-health-information response.
"""

    for attempt in range(3):

        try:

            response = client.models.generate_content(
                model="gemini-3.1-flash-lite",
                contents=prompt
            )

            if response.text:
                return response.text

            return "I couldn't generate a response. Please try again."

        except Exception as error:

            print(
                f"Gemini Error (attempt {attempt + 1}/3):",
                error
            )

            if attempt < 2:
                time.sleep(3)

    return (
        "The AI service is temporarily busy. "
        "Please try again in a few seconds."
    )