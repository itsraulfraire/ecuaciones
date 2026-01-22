app.factory("EcuacionesService", function(EcuacionesDAO, $q) {

    function analizarEcuacion(ecuacion) {
        let orden = 0;
        let grado = 1;
        let lineal = true;
        let tipo = "Ordinaria";

        // Orden: buscar y'', y''', etc
        const matches = ecuacion.match(/y('+)/g);
        if (matches) {
            orden = Math.max(...matches.map(m => m.length - 1));
        }

        // Grado: buscar potencias tipo (y')^2
        const gradoMatch = ecuacion.match(/\^(\d+)/);
        if (gradoMatch) {
            grado = parseInt(gradoMatch[1]);
        }

        // Linealidad: si hay potencias, productos o funciones
        if (ecuacion.includes("^") || ecuacion.includes("sin") || ecuacion.includes("cos") || ecuacion.includes("y*y")) {
            lineal = false;
        }

        // Tipo
        if (ecuacion.includes("∂")) {
            tipo = "Parcial";
        }

        return {
            orden,
            grado,
            linealidad: lineal ? "Lineal" : "No lineal",
            tipo
        };
    }

    return {
        analizar: function(ecuacion) {
            const deferred = $q.defer();

            EcuacionesDAO.analizar(ecuacion)
                .then(() => {
                    const resultado = analizarEcuacion(ecuacion);
                    deferred.resolve(resultado);
                })
                .catch(err => deferred.reject(err));

            return deferred.promise;
        }
    };

});
