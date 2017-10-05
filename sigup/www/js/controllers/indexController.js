angular.module('app').controller('indexController', function ($scope, $location, $rootScope){

  $rootScope.url = "http://localhost:8080/sigup_web/";
  $rootScope.usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado'));

  console.log($rootScope.usuarioLogado.usuario.nivelAcesso);

  $scope.logout = function(){
    window.localStorage.removeItem('usuarioLogado');
    $location.path('/login');
  }

});
