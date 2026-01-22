app.service("EcuacionesDAO", function($q) {

    this.analizar = function(ecuacion) {
        const deferred = $q.defer();
        deferred.resolve({ ecuacion });
        return deferred.promise;
    };

});
