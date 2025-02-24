from flask import Flask, jsonify, request
from algorithms.sort import *
from algorithms.search import *
from algorithms.tree import *



# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)

# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route("/")
def home():
    return "Hello, Flask!"

# main driver function
if __name__ == '__main__':

    # run() method of Flask class runs the application 
    # on the local development server.
    app.run()
