angular.module('app').controller('ordemController', function ($scope, $http, $rootScope, $location){

  $scope.ordem = {};

  $scope.listarProdutos = function(){
    $http.get($rootScope.url+"produto/listarTodos").then(function(response){
        $scope.produtos = response.data;
      }, function(erro){
        console.log(erro);
      });
  }

$scope.listarProdutos();

  $scope.salvar = function(){
    $scope.ordem.usuario = $rootScope.usuarioLogado.usuario;
    if($scope.ordem.id == undefined || $scope.ordem.id == null){
      $http.post($rootScope.url+"ordem/inserir", $scope.ordem).then(function(response){
        $location.path('/');
				}, function(erro){
					console.log(erro);
				});
    }else{
      $http.put($rootScope.url+"ordem/alterar", $scope.ordem).then(function(response){
      $location.path('/');
        }, function(erro){
          console.log(erro);
        });
    }
  }

  $scope.alterar = function(obj){
    $scope.ordem = angular.copy(obj);
    $scope.form = false;
  }

  $scope.excluir = function(id){
      $http.delete($rootScope.url+"ordem/excluir/"+id).then(function(response){
        $location.path('/');
      }, function(erro){
    			console.log(erro);
    	});
  }

  $scope.cancelar = function(){
    $location.path('/');
  }

});
