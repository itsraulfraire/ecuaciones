// ==========================
// App principal AngularJS
// ==========================

const app = angular.module("EcuacionesApp", ["ngRoute"]);

// ==========================
// Configuración de rutas
// ==========================
app.config(function ($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix("");

    $routeProvider
        .when("/", {
            templateUrl: "ecuaciones",
            controller: "EcuacionesCtrl"
        })
        .otherwise({
            redirectTo: "/"
        });
});

// ==========================
// Run (opcional, ligero)
// ==========================
app.run(function ($rootScope) {
    $rootScope.appTitulo = "Analizador de Ecuaciones Diferenciales";
});
