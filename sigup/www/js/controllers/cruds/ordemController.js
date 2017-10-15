angular.module('app').controller('ordemController', function ($scope, $http, $rootScope, $location){

  $scope.ordem = {};
  $scope.prioridades = [1,2,3,4,5];
  $scope.click = false;

  if($rootScope.ordem != undefined)
    $scope.ordem = $rootScope.ordem;

  $scope.listarProdutos = function(){
    $http.get($rootScope.url+"produto/listarTodos").then(function(response){
        $scope.produtos = response.data;
      }, function(erro){
        console.log(erro);
      });
  }

$scope.listarProdutos();

  $scope.salvar = function(){
    if(!$scope.myform.$invalid){
      if($scope.ordem.usuario == undefined || $scope.ordem.usuario == null)
        $scope.ordem.usuario = $rootScope.usuarioLogado.usuario;
      if($scope.ordem.id == undefined || $scope.ordem.id == null){
        $http.post($rootScope.url+"ordem/inserir", $scope.ordem).then(function(response){
          $location.path('/');
  				}, function(erro){
  					console.log(erro);
  				});
      }else{
        $scope.ordem.dataCriacao = (new Date($scope.ordem.dataCriacao.split('/').splice(1, 1)[0]+" "+$scope.ordem.dataCriacao.split('/').splice(0, 1)[0]+" "+$scope.ordem.dataCriacao.split('/').splice(2, 2)[0])).getTime();
        $http.put($rootScope.url+"ordem/alterar", $scope.ordem).then(function(response){
        $rootScope.ordem = undefined;
        $location.path('/');
          }, function(erro){
            console.log(erro);
          });
      }
    }
  }

  $scope.cancelar = function(){
    $scope.click = false;
    $location.path('/');
  }

});
