import os, json
import whisper
from google import genai
from .config import settings
from .utils import logger

client = genai.Client(api_key=settings.GOOGLE_API_KEY)

def transcribe_audio(file_path: str) -> str:
    try:
        model = whisper.load_model(settings.WHISPER_MODEL)
        result = model.transcribe(file_path)
        text = result["text"].strip()
        logger.info(f"Whisper transcription complete. {len(text)} chars.")
        return text
    except Exception as e:
        logger.error(f"Whisper transcription failed: {e}")
        return "."

def process_inventory(transcription: str) -> dict:
    prompt = f"""
    You are an inventory assistant for electrical items. Your sole output MUST be JSON.

    Raw transcription: "{transcription}"

    Valid items: {settings.VALID_ITEMS}

    Task:
    1. Correct items using the valid list.
    2. Aggregate repeated items into counts.
    3. Output ONLY JSON dictionary: {{"item_name": count}}
    """

    response = client.models.generate_content(
        model=settings.GEMINI_MODEL,
        contents=prompt,
        config={"temperature": 0}
    )

    raw_output = (response.text or "").strip()

    # Strip markdown fences if present
    if raw_output.startswith("```"):
        raw_output = raw_output.strip("`").replace("json", "", 1).strip()

    try:
        return json.loads(raw_output)
    except Exception as e:
        logger.error(f"Failed to parse Gemini output: {raw_output}")
        raise e
