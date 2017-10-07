angular.module('app').controller('itemController', function ($scope, $http, $rootScope){

  $scope.item = {};
  $scope.item.pecas = [];
  $scope.itens = [];
  $scope.pecas = [];
  $scope.form = true;
  $scope.opcoesPecas = true;

  $scope.listarItens = function(){
    console.log("Listando itens");
    $http.get($rootScope.url+"item/listarTodos").then(function(response){
      console.log(response.data);
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

$scope.listarPecas();
  $scope.listarItens();

  $scope.salvar = function(){
    if($scope.item.id == undefined || $scope.item.id == null){
      $http.post($rootScope.url+"item/inserir", $scope.item).then(function(response){
        $scope.listarItens();
        $scope.cancelar();
				}, function(erro){
					console.log(erro);
				});
    }else{
      $http.put($rootScope.url+"item/alterar", $scope.item).then(function(response){
        $scope.listarItens();
        $scope.cancelar();
        }, function(erro){
          console.log(erro);
        });
    }
  }

  $scope.alterar = function(obj){
    $scope.item = angular.copy(obj);
    $scope.form = false;
  }

  $scope.excluir = function(id){
      $http.delete($rootScope.url+"item/excluir/"+id).then(function(response){
        $scope.listarItens();
      }, function(erro){
    					console.log(erro);
    	});
  }

  $scope.mostrarPecas = function(){
    $scope.opcoesPecas = false;
  }

  $scope.adicionarPecas = function(peca){
    $scope.item.pecas.push(peca);
    console.log($scope.item);
    $scope.opcoesPecas = true;
  }

  $scope.removerPecas = function(peca, index){
    $scope.item.pecas.splice(index, 1);
  }

  $scope.cancelar = function(){
    $scope.item = {};
    $scope.form = true;
  }

});
