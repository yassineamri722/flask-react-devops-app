from flask import Flask, jsonify
from flask_cors import CORS  # ← importer CORS

app = Flask(__name__)
CORS(app, origins=["http://frontend:3000"])

@app.route("/")
def hello():
    return jsonify(message="Hello from Flask backend!")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
