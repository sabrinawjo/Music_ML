from flask_cors import CORS
from flask import Flask, render_template

app = Flask(__name__)
CORS(app)

# use decorators to link the function to a url
@app.route('/')
def home():
    return render_template('index.html')  # return a string

@app.route('/about.html')
def about():
    return render_template('about.html')  # render a template

@app.route('/analysis.html')
def analysis():
    return render_template('analysis.html')  # render a template

@app.route('/application.html')
def application():
    return render_template('application.html')  # render a template

@app.route('/data.html')
def data():
    return render_template('data.html')  # render a template

@app.route('/index.html')
def index_to_home():
    return render_template('index.html')  # return a string

@app.route('/method.html')
def method():
    return render_template('method.html')  # render a template

@app.route('/multiLine.html')
def multiLine():
    return render_template('multiLine.html')  # render a template

@app.route('/observations.html')
def observations():
    return render_template('observations.html')  # render a template

@app.route('/radar.html')
def radar():
    return render_template('radar.html')  # render a template

@app.route('/scatter.html')
def scatter():
    return render_template('scatter.html')  # render a template


# start the server with the 'run()' method
if __name__ == '__main__':
    app.run(debug=True)

