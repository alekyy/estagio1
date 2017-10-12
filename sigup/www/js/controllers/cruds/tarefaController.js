angular.module('app').controller('tarefaController', function ($scope, $http, $rootScope, $location){

  $scope.servico = {};
  $scope.prioridades = [1,2,3,4,5];

  if($rootScope.tarefa != undefined)
    $scope.tarefa = $rootScope.tarefa;

  $scope.salvar = function(){
    if($scope.tarefa.servico == undefined || $scope.tarefa.servico == null)
      $scope.tarefa.servico = $rootScope.servico;
    if($scope.tarefa.id == undefined || $scope.tarefa.id == null){
      $scope.tarefa.servico.dataInicio = (new Date($scope.tarefa.servico.dataInicio.split('/').splice(1, 1)[0]+" "+$scope.tarefa.servico.dataInicio.split('/').splice(0, 1)[0]+" "+$scope.tarefa.servico.dataInicio.split('/').splice(2, 2)[0])).getTime();
      $http.post($rootScope.url+"tarefa/inserir", $scope.tarefa).then(function(response){
        $location.path('/tarefasLista');
				}, function(erro){
					console.log(erro);
				});
    }else{
    $scope.tarefa.servico.dataInicio = (new Date($scope.tarefa.servico.dataInicio.split('/').splice(1, 1)[0]+" "+$scope.tarefa.servico.dataInicio.split('/').splice(0, 1)[0]+" "+$scope.tarefa.servico.dataInicio.split('/').splice(2, 2)[0])).getTime();
    $scope.tarefa.dataInicio = (new Date($scope.tarefa.dataInicio.split('/').splice(1, 1)[0]+" "+$scope.tarefa.dataInicio.split('/').splice(0, 1)[0]+" "+$scope.tarefa.dataInicio.split('/').splice(2, 2)[0])).getTime();
    $http.put($rootScope.url+"tarefa/alterar", $scope.tarefa).then(function(response){
      $rootScope.tarefa = undefined;
      $location.path('/tarefasLista');
        }, function(erro){
          console.log(erro);
        });
    }
  }

  $scope.listarColaboradores = function(){
    $http.get($rootScope.url+"colaborador/listarTodos").then(function(response){
        $scope.colaboradores = response.data;
      }, function(erro){
        console.log(erro);
      });
  }

  $scope.listarColaboradores();

  $scope.cancelar = function(){
    if($rootScope.tarefa == undefined || $rootScope.tarefa == null)
      $location.path('/servicosLista');
    else {
      $rootScope.tarefa = undefined;
      $location.path('/tarefasLista');
    }
  }

});
