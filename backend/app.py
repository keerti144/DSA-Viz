from flask import Flask, jsonify, request
from algorithms.sort import bubble_sort
from algorithms.search import linear_search

app = Flask(__name__)

@app.route('/sort', methods=['POST'])
def sort_array():
    data = request.json
    array = data.get('array')
    sorted_array = bubble_sort(array)
    return jsonify({'sorted': sorted_array})

@app.route('/search', methods=['POST'])
def search_element():
    data = request.json
    array = data.get('array')
    target = data.get('target')
    result = linear_search(array, target)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
