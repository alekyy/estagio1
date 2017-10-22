angular.module('app').controller('servicoVisaoController', function ($scope, $location, $http, $rootScope){

      $scope.formatarData = function(data){
        var date = new Date(data);
        date = ("0" + date.getDate()).substr(-2) + "/" + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear();
        return date;
      }

      if($rootScope.servico.dataTermino != undefined && $rootScope.servico.dataTermino != null)
        $rootScope.servico.dataTermino = $scope.formatarData($rootScope.servico.dataTermino);
      $scope.servico = $rootScope.servico;
      console.log($scope.servico);
      $scope.tarefas = [];
      $scope.colaboradores = [];

      $scope.buscarTarefas = function(){
          $http.get($rootScope.url+"tarefa/buscarTarefas/"+$scope.servico.id).then(function(response){
            $scope.tarefas = response.data;
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

      $scope.editar = function(tarefa){
        $http.put($rootScope.url+"tarefa/editar", tarefa).then(function(response){
          response.data.dataInicio = $scope.formatarData(response.data.dataInicio);
          response.data.dataTermino = $scope.formatarData(response.data.dataTermino);
          $scope.servico = response.data;
          Notification.success({message: 'Registro alterado com sucesso!',
           positionY: 'bottom', positionX: 'right', delay: 3000});
            }, function(erro){
              Notification.error({message: 'Ocorreu um erro ao tentar alterar o registro.',
             positionY: 'bottom', positionX: 'right', delay: 3000});
              console.log(erro);
            });
      }

      $scope.alterar = function(tarefa){
        $rootScope.tarefa = tarefa;
        $location.path('/tarefa');
      }

      $scope.buscarTarefas();
      $scope.listarColaboradores();

});
