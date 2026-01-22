from flask import Flask, render_template, request, jsonify
from sympy import symbols, Function, sympify, Derivative
import re

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/analizar", methods=["POST"])
def analizar_ecuacion():
    data = request.get_json()
    ecuacion_str = data.get("ecuacion", "")

    if not ecuacion_str:
        return jsonify({"error": "Ecuación vacía"}), 400

    try:
        x = symbols("x")
        y = Function("y")

        # Normalización básica
        expr = sympify(
            ecuacion_str
            .replace("y'", "Derivative(y(x), x)")
            .replace("y''", "Derivative(y(x), x, 2)")
            .replace("y'''", "Derivative(y(x), x, 3)")
            .replace("=", "-(") + ")"
        )

        derivadas = expr.atoms(Derivative)

        # ORDEN
        orden = max([d.derivative_count for d in derivadas]) if derivadas else 0

        # GRADO
        grado = 1
        for d in derivadas:
            potencias = expr.as_powers_dict()
            grado = potencias.get(d, 1)

        # LINEALIDAD
        lineal = True
        if expr.has(y(x)**2) or expr.has(y(x)*Derivative(y(x), x)):
            lineal = False
        if any(expr.has(f(y(x))) for f in [symbols("sin"), symbols("cos")]):
            lineal = False

        # TIPO
        if not lineal:
            tipo = "EDO no lineal"
        elif ecuacion_str.strip().endswith("= 0"):
            tipo = "EDO lineal homogénea"
        else:
            tipo = "EDO lineal no homogénea"

        return jsonify({
            "orden": orden,
            "grado": grado,
            "linealidad": "Lineal" if lineal else "No lineal",
            "tipo": tipo
        })

    except Exception as e:
        return jsonify({"error": "Ecuación no válida"}), 400


if __name__ == "__main__":
    app.run(debug=True)
