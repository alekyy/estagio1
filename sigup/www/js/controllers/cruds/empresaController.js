angular.module('app').controller('empresaController', function ($scope, $http, $rootScope){

  $scope.empresa = {};
  $scope.empresas = [];
  $scope.cidades = [];
  $scope.form = true;

  $scope.listarEmpresas = function(){
    $http.get($rootScope.url+"empresa/listarTodos").then(function(response){
  			$scope.empresas = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

  $scope.listarCidades = function(){
    $http.get($rootScope.url+"cidade/listarTodos").then(function(response){
  			$scope.cidades = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

  $scope.listarProdutos = function(){
    $http.get($rootScope.url+"produto/listarTodos").then(function(response){
  			$scope.produtos = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

$scope.listarCidades();
$scope.listarProdutos();
$scope.listarEmpresas();

  $scope.salvar = function(){
    if($scope.empresa.id == undefined || $scope.empresa.id == null){
      $http.post($rootScope.url+"empresa/inserir", $scope.empresa).then(function(response){
        $scope.listarEmpresas();
        $scope.cancelar();
				}, function(erro){
					console.log(erro);
				});
    }else{
      $http.put($rootScope.url+"empresa/alterar", $scope.empresa).then(function(response){
        $scope.listarEmpresas();
        $scope.cancelar();
        }, function(erro){
          console.log(erro);
        });
    }
  }

  $scope.alterar = function(obj){
    $scope.empresa = angular.copy(obj);
    $scope.form = false;
  }

  $scope.excluir = function(id){
      $http.delete($rootScope.url+"empresa/excluir/"+id).then(function(response){
        $scope.listarEmpresas();
      }, function(erro){
    					console.log(erro);
    	});
  }

  $scope.cancelar = function(){
    $scope.empresa = {};
    console.log($scope.empresa);
    $scope.form = true;
  }

});
