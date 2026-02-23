from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from model import predict_sentiment





app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )

class TextData(BaseModel):
    text:str


class PredictionOut(BaseModel):
    sentiment: str
    confidence: float
    positive: float
    negative: float


app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def serve_homepage():
    return FileResponse("static/index.html")


@app.post("/predict" , response_model=PredictionOut)
def predict(payload: TextData):
    text = payload.text
    result = predict_sentiment(text)
    return {
        "text":       text,
        "sentiment":  result["sentiment"],
        "confidence": result["confidence"],
        "positive":   result["positive"],
        "negative":   result["negative"],
    }