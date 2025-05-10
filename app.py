from flask import Flask, request, jsonify
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

analyzer = SentimentIntensityAnalyzer()

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    text = data.get('text', '')
    scores = analyzer.polarity_scores(text)
    return jsonify(scores)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
