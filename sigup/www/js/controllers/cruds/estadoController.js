angular.module('app').controller('estadoController', function ($scope, $http, $rootScope){

  $scope.estado = {};
  $scope.estados = [];
  $scope.form = true;

  $scope.listarEstados = function(){
    $http.get($rootScope.url+"estado/listarTodos").then(function(response){
  			$scope.estados = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

$scope.listarEstados();

  $scope.salvar = function(){
    if($scope.estado.id == undefined || $scope.estado.id == null){
      $http.post($rootScope.url+"estado/inserir", $scope.estado).then(function(response){
        $scope.listarEstados();
        $scope.cancelar();
				}, function(erro){
					console.log(erro);
				});
    }else{
      $http.put($rootScope.url+"estado/alterar", $scope.estado).then(function(response){
        $scope.listarEstados();
        $scope.cancelar();
        }, function(erro){
          console.log(erro);
        });
    }
  }

  $scope.alterar = function(obj){
    $scope.estado = angular.copy(obj);
    $scope.form = false;
  }

  $scope.excluir = function(id){
      $http.delete($rootScope.url+"estado/excluir/"+id).then(function(response){
        $scope.listarEstados();
      }, function(erro){
    					console.log(erro);
    	});
  }

  $scope.cancelar = function(){
    $scope.estado = {};
    $scope.form = true;
  }

});
