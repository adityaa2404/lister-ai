import os
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse  # <-- import this
from .inventory import transcribe_audio, process_inventory
from .schemas import InventoryResponse
from .config import settings
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd  # to save inventory to Excel

app = FastAPI(title="Inventory Transcriber")
from fastapi.middleware.cors import CORSMiddleware

# List of frontend URLs that are allowed to make requests to this backend
# List of frontend URLs that are allowed to make requests to this backend
origins = [
    "http://localhost:8080",      # React dev server
    "http://127.0.0.1:8080",      # Alternative localhost
    "http://localhost:5173",      # Vite dev server (alternative port)
    "http://127.0.0.1:5173",      # Alternative localhost
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,                    # This is the important part ✅
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path where the Excel file will be saved
EXCEL_FILE = "inventory_records.xlsx"

@app.post("/process-audio", response_model=InventoryResponse)
async def process_audio(file: UploadFile = File(...)):
    # Save uploaded file
    os.makedirs(settings.AUDIO_DIR, exist_ok=True)
    file_path = os.path.join(settings.AUDIO_DIR, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Step 1: Transcribe
    transcription = transcribe_audio(file_path)

    # Step 2: Process with Gemini
    inventory = process_inventory(transcription)

    # Step 3: Save inventory to Excel dynamically
    df = pd.DataFrame(list(inventory.items()), columns=["Item", "Count"])
    df.to_excel(EXCEL_FILE, index=False)

    return {"inventory": inventory, "transcription": transcription}


@app.get("/download-excel")
async def download_excel():
    if not os.path.exists(EXCEL_FILE):
        return {"error": "No inventory records found yet."}

    return FileResponse(
        path=EXCEL_FILE,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename="inventory_records.xlsx"
    )
