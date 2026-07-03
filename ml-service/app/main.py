from fastapi import FastAPI
from pydantic import BaseModel
import spacy
from app.forecast import generate_forecast

app = FastAPI()

# Load NLP model
nlp = spacy.load("en_core_web_sm")

# Request schema
class TransactionInput(BaseModel):
    description: str
    amount: float

class ForecastRequest(BaseModel):
    user_id: str

# Basic keyword-based category mapping (will improve later)
CATEGORY_KEYWORDS = {
    "food": ["restaurant", "food", "dinner", "lunch"],
    "healthcare": ["hospital", "doctor", "medicine"],
    "travel": ["uber", "flight", "bus", "train"],
    "shopping": ["amazon", "clothes", "shopping"],
}

def classify_category(text):
    text_lower = text.lower()
    for category, keywords in CATEGORY_KEYWORDS.items():
        for word in keywords:
            if word in text_lower:
                return category
    return "others"

def detect_anomaly(amount, category):
    # Simple rule-based anomaly (you will improve later)
    if amount > 3000 and category == "healthcare":
        return True, "medical_emergency"
    if amount > 10000:
        return True, "high_spend"
    return False, None

def extract_entities(doc):
    return [{ "text": ent.text, "label": ent.label_ } for ent in doc.ents]

@app.post("/analyze")
def analyze_transaction(data: TransactionInput):
    doc = nlp(data.description)

    category = classify_category(data.description)
    is_anomalous, anomaly_type = detect_anomaly(data.amount, category)
    entities = extract_entities(doc)

    return {
        "category": category,
        "subcategory": None,
        "entities": entities,
        "is_anomalous": is_anomalous,
        "anomaly_type": anomaly_type,
        "is_recurring": False
    }
@app.post("/forecast")
def forecast_expenses(data: ForecastRequest):
    try:
        result = generate_forecast(data.user_id)

        return {
            "status": "success",
            "forecast": result
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }