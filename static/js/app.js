function analizar() {
    const ecuacion = document.getElementById("ecuacion").value;
    const resultado = document.getElementById("resultado");

    resultado.innerHTML = "⏳ Analizando...";

    fetch("/analizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ecuacion })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            resultado.innerHTML = "❌ " + data.error;
            return;
        }

        resultado.innerHTML = `
            <b>Orden:</b> ${data.orden}<br>
            <b>Grado:</b> ${data.grado}<br>
            <b>Linealidad:</b> ${data.linealidad}<br>
            <b>Tipo:</b> ${data.tipo}
        `;
    })
    .catch(() => {
        resultado.innerHTML = "❌ Error al analizar la ecuación";
    });
}
