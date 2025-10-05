import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    WHISPER_MODEL: str = os.getenv("WHISPER_MODEL", "base")
    AUDIO_DIR: str = os.getenv("AUDIO_DIR", "audio")

    VALID_ITEMS = [
        "1_module plate", "2_module plate", "3_module plate", "4_module plate",
        "6_module plate", "8_module(long) plate", "8_module(square) plate",
        "12 module plate", "6 Amp switch", "6 Amp socket", "16 Amp switch",
        "16 Amp socket", "2 way switch", "Dummy Plate", "3 module foot lamp",
        "Bell Push", "Dimmer", "Fan Dimmer", "6_module Surface Box", "40 Amp 4 pole MCB"
    ]

settings = Settings()
