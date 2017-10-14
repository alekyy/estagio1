angular.module('app').controller('servicoVisaoController', function ($scope, $location, $http, $rootScope){

      $scope.servico = $rootScope.servico;
      $scope.tarefas = [];
      $scope.colaboradores = [];
      $scope.panel = "";

      $scope.buscarTarefas = function(){
          $http.get($rootScope.url+"tarefa/buscarTarefas/"+$scope.servico.id).then(function(response){
            $scope.tarefas = response.data;
            // if($scope.servico.status == 'ABERTO')
            //   $scope.panel = "panel-primary";
            // else if($scope.servico.status == 'EM_PROGRESSO')
            //   $scope.panel = "panel-yellow";
            // else if($scope.servico.status == 'FINALIZADO')
            //   $scope.panel = "panel-green";
          }, function(erro){
        			console.log(erro);
        	});
      }

      $scope.listarColaboradores = function(){
        $http.get($rootScope.url+"colaborador/listarTodos").then(function(response){
      			$scope.colaboradores = response.data;
      		}, function(erro){
      			console.log(erro);
      		});
      }

      $scope.voltar = function(){
        $rootScope.servico = undefined;
        $location.path('/servicosLista');
      }

      $scope.buscarTarefas();
      $scope.listarColaboradores();

});
