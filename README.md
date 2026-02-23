<div align="center">

# 🤖 AI Sentiment Analyzer

<img src="https://img.shields.io/badge/Python-3.8+-blue?style=for-the-badge&logo=python&logoColor=white"/>
<img src="https://img.shields.io/badge/FastAPI-0.131.0-009688?style=for-the-badge&logo=fastapi&logoColor=white"/>
<img src="https://img.shields.io/badge/scikit--learn-1.6.1-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white"/>
<img src="https://img.shields.io/badge/spaCy-3.8.11-09A3D5?style=for-the-badge&logo=spacy&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
<img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge"/>

<br/>
<br/>

**Real-time AI-powered sentiment analysis web app that detects positive or negative emotions in any text — instantly and with confidence scores!**

[Features](#-features) •
[Live Demo](#-live-demo) •
[Installation](#-installation) •
[Usage](#-usage) •
[How It Works](#-how-it-works)

<br/>

🌐 **[Live Demo → sentiment-analyzer-8un9.onrender.com](https://sentiment-analyzer-8un9.onrender.com/)**

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🧠 **AI Analysis** | Powered by a trained scikit-learn ML pipeline |
| 😄 **Emotion Detection** | Detects Positive vs Negative sentiment |
| 📊 **Confidence Score** | Shows how confident the model is in its prediction |
| 🍩 **Visual Breakdown** | Animated donut chart with probability distribution |
| ⚡ **Real-time Results** | Instant prediction with no page reload |
| 🐳 **Docker Ready** | Fully containerized for easy deployment |

---

## 🚀 Live Demo

Try it out here 👉 [https://sentiment-analyzer-8un9.onrender.com/](https://sentiment-analyzer-8un9.onrender.com/)

Just paste any text — a movie review, product feedback, tweet, or anything you like — and hit **Analyze Text**!

---

## 🛠️ Installation

### Prerequisites

- Python 3.8 or higher
- pip

### Setup

Clone the repository:

```bash
git clone https://github.com/amirhosseinzandi-web/sentiment-analyzer.git
cd sentiment-analyzer
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Download the spaCy language model:

```bash
python -m spacy download en_core_web_sm
```

Run the app:

```bash
uvicorn main:app --reload
```

Open your browser at `http://127.0.0.1:8000`

---

### 🐳 Docker

Build and run with Docker:

```bash
docker build -t sentiment-analyzer .
docker run -p 8000:8000 sentiment-analyzer
```

---

## 🎮 Usage

1. Open the app in your browser
2. Type or paste any text into the input box
3. Click **Analyze Text** (or press `Ctrl + Enter`)
4. View your results:
   - **Sentiment** — Positive or Negative
   - **Confidence Score** — Model's certainty percentage
   - **Mood** — Human-readable emotion label
   - **Donut Chart** — Visual probability breakdown

---

## 🧠 How It Works

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  User Text  │ ──► │    spaCy     │ ──► │  Lemma &    │
│   Input     │     │  NLP Engine  │     │  Cleaning   │
└─────────────┘     └──────────────┘     └─────────────┘
                                                │
                                                ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Results   │ ◄── │  Prediction  │ ◄── │  sklearn    │
│   Display   │     │  + Proba     │     │  Pipeline   │
└─────────────┘     └──────────────┘     └─────────────┘
```

### Key Components

- **Text Preprocessing**: Regex cleaning + spaCy lemmatization via `en_core_web_sm`
- **ML Pipeline**: Trained scikit-learn pipeline (`.joblib`) for vectorization + classification
- **API**: FastAPI backend serving predictions at `/predict`
- **Frontend**: Vanilla JS + Axios with a fully animated UI

---

## 📁 Project Structure

```
sentiment-analyzer/
├── 📄 main.py                          # FastAPI app & routes
├── 📄 model.py                         # Preprocessing & prediction logic
├── 📄 requirements.txt                 # Python dependencies
├── 🐳 Dockerfile                       # Docker container config
├── 📁 static/
│   ├── 📄 index.html                   # Frontend UI
│   ├── 📄 app.js                       # JS logic & API calls
│   └── 🎨 style.css                    # Styling
└── 📁 assets/
    └── 🤖 sentiment-analyzer_pipeline.joblib   # Trained ML model
```

---

## 🛠️ Tech Stack

<div align="center">

| Technology | Purpose |
|------------|---------|
| ![Python](https://img.shields.io/badge/Python-FFD43B?style=flat-square&logo=python&logoColor=blue) | Core Language |
| ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white) | REST API Backend |
| ![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat-square&logo=scikit-learn&logoColor=white) | ML Pipeline |
| ![spaCy](https://img.shields.io/badge/spaCy-09A3D5?style=flat-square&logo=spacy&logoColor=white) | NLP Preprocessing |
| ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | Containerization |

</div>

---

## 📊 API Reference

### `POST /predict`

**Request body:**
```json
{ "text": "This movie was absolutely amazing!" }
```

**Response:**
```json
{
  "sentiment": "positive",
  "confidence": 0.9731,
  "positive": 0.9731,
  "negative": 0.0269
}
```

---

## 🔮 Future Improvements

- [ ] 🌍 Multi-language support
- [ ] 😐 Neutral sentiment class
- [ ] 🔑 Key phrase extraction & highlighting
- [ ] 📈 Batch text analysis
- [ ] 📱 Mobile-optimized UI
- [ ] 🔊 Voice input support

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

<br/>

Made with ❤️ by [Amir Hossein Zandi](https://github.com/amirhosseinzandi-web)

<br/>

<img src="https://img.shields.io/github/stars/amirhosseinzandi-web/sentiment-analyzer?style=social"/>
<img src="https://img.shields.io/github/forks/amirhosseinzandi-web/sentiment-analyzer?style=social"/>

</div>
