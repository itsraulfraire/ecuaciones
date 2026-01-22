app.controller("EcuacionesCtrl", function($scope, EcuacionesService) {

    $scope.ecuacion = "";
    $scope.resultado = null;

    $scope.analizar = function() {
        if (!$scope.ecuacion) return;

        EcuacionesService.analizar($scope.ecuacion)
            .then(res => {
                $scope.resultado = res;
            })
            .catch(err => {
                console.error(err);
            });
    };

});
