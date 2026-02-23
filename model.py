import joblib
import re
from pathlib import Path
import spacy



BASE_DIR = Path(__file__).resolve(strict=True).parent

# Load pipeline
pipe = joblib.load(f"{BASE_DIR}/assets/sentiment-analyzer_pipeline.joblib")
nlp = spacy.load("en_core_web_sm" , disable=["parser" , "ner" , "textcat"])

def preprocess_texts(texts):
    cleaned_texts = [re.sub(r"[^a-zA-Z0-9']+", " ", t).strip() for t in texts]
    
    results = []
    for doc in nlp.pipe(cleaned_texts, batch_size=1000):
        tokens = [token.lemma_.lower() for token in doc if not token.is_punct]
        results.append(" ".join(tokens))
    
    return results



def predict_sentiment(text):
    cleaned_text = preprocess_texts([text])[0]
    sentiment = pipe.predict([cleaned_text])[0]
    proba = pipe.predict_proba([cleaned_text])[0]
    classes = list(pipe.classes_)

    proba_dict = {cls: float(prob) for cls , prob in zip(classes , proba)}
    
    positive_prob = proba_dict.get("positive" , 0.0)
    negative_prob = proba_dict.get("negative" , 0.0)
    confidence = proba_dict.get(sentiment , 0.0)

    return {
        "sentiment":  sentiment,
        "confidence": round(confidence , 4),
        "positive":   round(positive_prob , 4),
        "negative":   round(negative_prob , 4),
    }
