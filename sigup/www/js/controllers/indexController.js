angular.module('app').controller('indexController', function ($scope, $location, $rootScope, $route, $http){

  $rootScope.url = "http://localhost:8080/sigup_web/";
  $rootScope.usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado'));
  $scope.header = "";
  $scope.relatorio = "";

  console.log($rootScope.usuarioLogado);
  if($rootScope.usuarioLogado == undefined || $rootScope.usuarioLogado == null)
      $location.path('/login');

  $scope.logout = function(){
    window.localStorage.removeItem('usuarioLogado');
    $location.path('/login');
  }

  $scope.definirRelatorio = function(header, relatorio){
    $scope.header = header;
    $scope.relatorio = relatorio;
  }

  $scope.gerarRelatorio = function(){
    $http.get($rootScope.url+"relatorio/gerarRelatorio/"+$scope.relatorio+".jasper", { responseType: 'arraybuffer'}).then(function(response){
      var file = new Blob([(response.data)], {type: 'application/pdf'});
       var fileURL = URL.createObjectURL(file);
       window.open(fileURL);
      }, function(erro){
        console.log(erro);
      });
  }

});
