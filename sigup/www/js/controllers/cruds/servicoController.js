angular.module('app').controller('servicoController', function ($scope, $http, $rootScope, $location){

  $scope.servico = {};
  $scope.prioridades = [1,2,3,4,5];
  $scope.click = false;

  if($rootScope.servico != undefined)
    $scope.servico = $rootScope.servico;

  $scope.salvar = function(){
    if(!$scope.myform.$invalid{
      if($scope.servico.ordem == undefined || $scope.servico.ordem == null)
        $scope.servico.ordem = $rootScope.ordem;
      if($scope.servico.id == undefined || $scope.servico.id == null){
        $http.post($rootScope.url+"servico/inserir", $scope.servico).then(function(response){
          $location.path('/servicosLista');
  				}, function(erro){
  					console.log(erro);
  				});
      }else{
        $scope.servico.dataInicio = (new Date($scope.servico.dataInicio.split('/').splice(1, 1)[0]+" "+$scope.servico.dataInicio.split('/').splice(0, 1)[0]+" "+$scope.servico.dataInicio.split('/').splice(2, 2)[0])).getTime();
        $http.put($rootScope.url+"servico/alterar", $scope.servico).then(function(response){
        $rootScope.servico = undefined;
        $location.path('/servicosLista');
          }, function(erro){
            console.log(erro);
          });
      }
    }
  }

  $scope.cancelar = function(){
    $scope.click = false;
    if($rootScope.servico == undefined || $rootScope.servico == null)
      $location.path('/');
    else {
      $rootScope.servico = undefined;
      $location.path('/servicosLista');
    }
  }

});
