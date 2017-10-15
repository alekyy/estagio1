angular.module('app').controller('moduloController', function ($scope, $http, $rootScope){

  $scope.modulo = {};
  $scope.modulos = [];
  $scope.produtos = [];
  $scope.form = true;
  $scope.click = false;

  $scope.listarModulos = function(){
    $http.get($rootScope.url+"modulo/listarTodos").then(function(response){
  			$scope.modulos = response.data;
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

$scope.listarProdutos();
$scope.listarModulos();

  $scope.salvar = function(){
    if(!$scope.myform.$invalid){
      if($scope.modulo.id == undefined || $scope.modulo.id == null){
        $http.post($rootScope.url+"modulo/inserir", $scope.modulo).then(function(response){
          $scope.listarModulos();
          $scope.cancelar();
  				}, function(erro){
  					console.log(erro);
  				});
      }else{
        $http.put($rootScope.url+"modulo/alterar", $scope.modulo).then(function(response){
          $scope.listarModulos();
          $scope.cancelar();
          }, function(erro){
            console.log(erro);
          });
      }
    }
  }

  $scope.alterar = function(obj){
    $scope.modulo = angular.copy(obj);
    $scope.form = false;
  }

  $scope.excluir = function(id){
      $http.delete($rootScope.url+"modulo/excluir/"+id).then(function(response){
        $scope.listarModulos();
      }, function(erro){
    					console.log(erro);
    	});
  }

  $scope.cancelar = function(){
    $scope.modulo = {};
    $scope.form = true;
    $scope.click = false;
  }

});
