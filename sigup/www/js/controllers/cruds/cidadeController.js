angular.module('app').controller('cidadeController', function ($scope, $http, $rootScope){

  $scope.cidade = {};
  $scope.cidades = [];
  $scope.estados = [];
  $scope.form = true;

  $scope.listarCidades = function(){
    $http.get($rootScope.url+"cidade/listarTodos").then(function(response){
  			$scope.cidades = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

  $scope.listarEstados = function(){
    $http.get($rootScope.url+"estado/listarTodos").then(function(response){
  			$scope.estados = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

$scope.listarEstados();
$scope.listarCidades();

  $scope.salvar = function(){
    if($scope.cidade.id == undefined || $scope.cidade.id == null){
      $http.post($rootScope.url+"cidade/inserir", $scope.cidade).then(function(response){
        $scope.listarCidades();
        $scope.cancelar();
				}, function(erro){
					console.log(erro);
				});
    }else{
      $http.put($rootScope.url+"cidade/alterar", $scope.cidade).then(function(response){
        $scope.listarCidades();
        $scope.cancelar();
        }, function(erro){
          console.log(erro);
        });
    }
  }

  $scope.alterar = function(obj){
    $scope.cidade = angular.copy(obj);
    $scope.form = false;
  }

  $scope.excluir = function(id){
      $http.delete($rootScope.url+"cidade/excluir/"+id).then(function(response){
        $scope.listarCidades();
      }, function(erro){
    					console.log(erro);
    	});
  }

  $scope.cancelar = function(){
    $scope.cidade = {};
    $scope.form = true;
  }

});
