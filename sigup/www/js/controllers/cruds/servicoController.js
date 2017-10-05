angular.module('app').controller('servicoController', function ($scope, $http, $rootScope){

  $scope.servico = {};
  $scope.servicos = [];
  $scope.form = true;

  $scope.listarServicos = function(){
    $http.get($rootScope.url+"servico/listarTodos").then(function(response){
  			$scope.servicos = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

$scope.listarServicos();

  $scope.salvar = function(){
    if($scope.servico.id == undefined || $scope.servico.id == null){
      $http.post($rootScope.url+"servico/inserir", $scope.servico).then(function(response){
        $scope.listarServicos();
        $scope.cancelar();
				}, function(erro){
					console.log(erro);
				});
    }else{
      $http.put($rootScope.url+"servico/alterar", $scope.servico).then(function(response){
        $scope.listarServicos();
        $scope.cancelar();
        }, function(erro){
          console.log(erro);
        });
    }
  }

  $scope.alterar = function(obj){
    $scope.servico = angular.copy(obj);
    $scope.form = false;
  }

  $scope.excluir = function(id){
      $http.delete($rootScope.url+"servico/excluir/"+id).then(function(response){
        $scope.listarServicos();
      }, function(erro){
    					console.log(erro);
    	});
  }

  $scope.cancelar = function(){
    $scope.servico = {};
    $scope.form = true;
  }

});
