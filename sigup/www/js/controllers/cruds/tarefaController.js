angular.module('app').controller('tarefaController', function ($scope, $http, $rootScope){

  $scope.tarefa = {};
  $scope.tarefas = [];
  $scope.form = true;

  $scope.listarTarefas = function(){
    $http.get($rootScope.url+"tarefa/listarTodos").then(function(response){
  			$scope.tarefas = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

$scope.listarTarefas();

  $scope.salvar = function(){
    if($scope.tarefa.id == undefined || $scope.tarefa.id == null){
      $http.post($rootScope.url+"tarefa/inserir", $scope.tarefa).then(function(response){
        $scope.listarTarefas();
        $scope.cancelar();
				}, function(erro){
					console.log(erro);
				});
    }else{
      $http.put($rootScope.url+"tarefa/alterar", $scope.tarefa).then(function(response){
        $scope.listarTarefas();
        $scope.cancelar();
        }, function(erro){
          console.log(erro);
        });
    }
  }

  $scope.alterar = function(obj){
    $scope.tarefa = angular.copy(obj);
    $scope.form = false;
  }

  $scope.excluir = function(id){
      $http.delete($rootScope.url+"tarefa/excluir/"+id).then(function(response){
        $scope.listarTarefas();
      }, function(erro){
    					console.log(erro);
    	});
  }

  $scope.cancelar = function(){
    $scope.tarefa = {};
    $scope.form = true;
  }

});
