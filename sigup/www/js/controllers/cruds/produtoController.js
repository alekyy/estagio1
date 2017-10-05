angular.module('app').controller('produtoController', function ($scope, $http, $rootScope){

  $scope.produto = {};
  $scope.produtos = [];
  $scope.form = true;

  $scope.listarProdutos = function(){
    $http.get($rootScope.url+"produto/listarTodos").then(function(response){
  			$scope.produtos = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

$scope.listarProdutos();

  $scope.salvar = function(){
    if($scope.produto.id == undefined || $scope.produto.id == null){
      $http.post($rootScope.url+"produto/inserir", $scope.produto).then(function(response){
        $scope.listarProdutos();
        $scope.cancelar();
				}, function(erro){
					console.log(erro);
				});
    }else{
      $http.put($rootScope.url+"produto/alterar", $scope.produto).then(function(response){
        $scope.listarProdutos();
        $scope.cancelar();
        }, function(erro){
          console.log(erro);
        });
    }
  }

  $scope.alterar = function(obj){
    $scope.produto = angular.copy(obj);
    $scope.form = false;
  }

  $scope.excluir = function(id){
      $http.delete($rootScope.url+"produto/excluir/"+id).then(function(response){
        $scope.listarProdutos();
      }, function(erro){
    					console.log(erro);
    	});
  }

  $scope.cancelar = function(){
    $scope.produto = {};
    $scope.form = true;
  }

});
