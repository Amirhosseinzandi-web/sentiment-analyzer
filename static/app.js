// const API_URL = 'http://127.0.0.1:8000';


const MOOD_MAP = {
    positive: 'Happy & Satisfied',
    negative: 'Upset & Dissatisfied',
};

// ── Main analyze function ─────────────────
async function analyzeText() {
    const input = document.getElementById('textInput').value.trim();
    if (!input) {
        showError('Please enter some text...');
        return;
    }

    const btn = document.getElementById('analyzeBtn');
    btn.classList.add('loading');
    btn.disabled = true;
    hideError();

    try {
        const response = await axios.post(`/predict`, { text: input }, {
            headers: { 'Content-Type': 'application/json' }
        });
        renderResults(response.data);

    } catch (err) {
        console.error(err);
        showError('Something went wrong...');
    } finally {
        btn.classList.remove('loading');
        btn.disabled = false;
    }
}

// ── Render results —
function renderResults(data) {
    // { text, sentiment, confidence, positive, negative }
    // console.log(data.sentiment);
    
    const sentiment  = (data.sentiment  || 'negative').toLowerCase();
    const confidence = data.confidence !== undefined ? Math.round(data.confidence * 100) : 0;
    const posProb    = data.positive   !== undefined ? Math.round(data.positive   * 100) : 0;
    const negProb    = data.negative   !== undefined ? Math.round(data.negative   * 100) : 0;

    // ── Sentiment label ──
    const sentEl = document.getElementById('sentimentText');
    sentEl.textContent = capitalize(sentiment);
    sentEl.className   = 'sentiment-value ' + sentiment;

    // ── Confidence ──
    document.getElementById('confidenceScore').textContent = confidence + '%';

    // ── Mood
    document.getElementById('moodText').textContent = MOOD_MAP[sentiment] || '—';

    // ── Key Phrases
    const kpRow = document.querySelector('.key-phrases-row');
    if (kpRow) kpRow.style.display = 'none';

    // ── Emoji ──
    const emojiMap = { positive: '😊', negative: '😞' };
    document.getElementById('emojiFace').textContent = emojiMap[sentiment] || '😐';
    const emojiGlowEl = document.querySelector('.emoji-glow');
    if (emojiGlowEl) {
        const glowColor = sentiment === 'positive'
            ? 'rgba(74,222,128,0.25)'
            : 'rgba(248,113,113,0.25)';
        emojiGlowEl.style.background = `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`;
    }

    // ── Donut chart —
    document.getElementById('posPercent').textContent = posProb + '%';
    document.getElementById('negPercent').textContent = negProb + '%';

    // Neutral
    const neuRow = document.querySelector('.legend-item:nth-child(2)');
    if (neuRow) neuRow.style.display = 'none';

    updateDonut(posProb, 0, negProb);

    // ── section ──
    const section = document.getElementById('resultsSection');
    section.classList.add('visible');
    section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── Donut chart ───────────────────────────
function updateDonut(pos, neu, neg) {
    const donut = document.getElementById('donutChart');
    const total = pos + neg || 100;
    const posDeg = (pos / total) * 360;
    const negDeg = (neg / total) * 360;

    donut.style.background = `conic-gradient(
        #4ade80 0deg ${posDeg}deg,
        #f87171 ${posDeg}deg ${posDeg + negDeg}deg
    )`;
    donut.style.boxShadow = pos >= neg
        ? '0 0 20px rgba(74,222,128,0.3)'
        : '0 0 20px rgba(248,113,113,0.3)';
}

// ── Helpers ───────────────────────────────
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showError(msg) {
    let el = document.querySelector('.error-toast');
    if (!el) {
        el = document.createElement('div');
        el.className = 'error-toast';
        document.querySelector('.btn-wrapper').after(el);
    }
    el.textContent = msg;
    el.classList.add('show');
}

function hideError() {
    const el = document.querySelector('.error-toast');
    if (el) el.classList.remove('show');
}

// ── Ctrl+Enter shortcut ───────────────────
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('textInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) analyzeText();
    });
});