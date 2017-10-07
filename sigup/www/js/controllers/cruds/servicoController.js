angular.module('app').controller('servicoController', function ($scope, $http, $rootScope, $location){

  $scope.servico = {};
  $scope.prioridades = [1,2,3,4,5];

  if($rootScope.servico != undefined)
    $scope.servico = $rootScope.servico;

  $scope.salvar = function(){
    if($scope.servico.ordem == undefined || $scope.servico.ordem == null)
      $scope.servico.ordem = $rootScope.ordem;
    if($scope.servico.id == undefined || $scope.servico.id == null){
      $http.post($rootScope.url+"servico/inserir", $scope.servico).then(function(response){
        $location.path('/servicosLista');
				}, function(erro){
					console.log(erro);
				});
    }else{
    $http.put($rootScope.url+"servico/alterar", $scope.servico).then(function(response){
      $rootScope.servico = undefined;
      $location.path('/servicosLista');
        }, function(erro){
          console.log(erro);
        });
    }
  }

  $scope.cancelar = function(){
    if($rootScope.servico == undefined || $rootScope.servico == null)
      $location.path('/');
    else {
      $rootScope.servico = undefined;
      $location.path('/servicosLista');
    }
  }

});
