from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def ecuaciones():
    return render_template("ecuaciones.html")

if __name__ == "__main__":
    app.run(debug=True)
