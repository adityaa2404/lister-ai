from pydantic import BaseModel
from typing import Dict

class InventoryResponse(BaseModel):
    inventory: Dict[str, int]
    transcription: str
