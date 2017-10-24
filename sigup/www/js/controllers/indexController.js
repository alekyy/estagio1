angular.module('app').controller('indexController', function ($scope, $location, $rootScope, $route, $http){

  $rootScope.url = "http://localhost:8080/sigup_web/";
  $rootScope.usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado'));
  $scope.header = "";
  $scope.relatorio = "";

  $scope.logout = function(){
    window.localStorage.removeItem('usuarioLogado');
    $route.reload();
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
