angular.module('app').controller('montarItemController', function ($scope, $http, $rootScope){

  $scope.item = {};
  $scope.itens = [];
  $scope.pecas = [];
  $scope.form = true;
  $scope.panel = true;
  $scope.itensPossiveis = 0;
  $scope.itemMontado = {};

  $scope.listarItens = function(){
    $http.get($rootScope.url+"item/listarTodos").then(function(response){
  			$scope.itens = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

  $scope.listarPecas = function(){
    $http.get($rootScope.url+"peca/listarTodos").then(function(response){
        $scope.pecas = response.data;
      }, function(erro){
        console.log(erro);
      });
  }

  $scope.listarItensPossiveis = function(item){
    $http.post($rootScope.url+"item/listarItensPossiveis", item).then(function(response){
      console.log(response.data);
        $scope.itensPossiveis = response.data;
      }, function(erro){
        console.log(erro);
      });
  }

$scope.listarPecas();
$scope.listarItens();

$scope.inserirNovosItens = function(){
  if(!$scope.myform.$invalid){
    $scope.itemMontado.item = $scope.item;
    $scope.itemMontado.responsavel = $rootScope.usuarioLogado;
    console.log($scope.itemMontado);
    $http.post($rootScope.url+"item/montarItem", $scope.itemMontado).then(function(response){
      $scope.listarItens();
      $scope.listarPecas();
      $scope.panel = true;
      $scope.item = {};
      $scope.itemMontado = {};
      }, function(erro){
        console.log(erro);
      });
  }
}


  $scope.montarItem = function(obj){
    $scope.item = obj;
    console.log($scope.item);
    $scope.listarItensPossiveis($scope.item);
    $scope.panel = false;
  }

  $scope.cancelar = function(){
    $scope.item = {};
    $scope.itemMontado = {};
    $scope.panel = true;
  }

});
