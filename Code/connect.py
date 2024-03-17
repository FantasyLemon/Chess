from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/get_data')
def get_data():
    # Simulated data retrieval
    data = {'message': 'Hello from Python! This data is retrieved from a Python file.'}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
