angular.module('app').controller('tarefaController', function ($scope, $http, $rootScope, $location){

  $scope.servico = $rootScope.servico;
  $scope.tarefa = {};
  $scope.tarefa.servico = {};
  $scope.tarefa.itemTarefa = [];
  $scope.itemTarefa = {};
  $scope.prioridades = [1,2,3,4,5];
  $scope.colaboradores = [];
  $scope.itens = [];
  $scope.click = false;
  $scope.clickItem = false;

  if($rootScope.tarefa != undefined)
    $scope.tarefa = $rootScope.tarefa;

  $scope.salvar = function(){
    if(!$scope.myform.$invalid){
      if($scope.tarefa.servico.id == undefined || $scope.tarefa.servico.id == null)
        $scope.tarefa.servico.id = $rootScope.servico.id;
      if($scope.tarefa.id == undefined || $scope.tarefa.id == null){
        $http.post($rootScope.url+"tarefa/inserir", $scope.tarefa).then(function(response){
          $location.path('/servicosLista');
  				}, function(erro){
  					console.log(erro);
  				});
      }else{
        $http.put($rootScope.url+"tarefa/alterar", $scope.tarefa).then(function(response){
        $rootScope.tarefa = undefined;
        $location.path('/servicosLista');
          }, function(erro){
            console.log(erro);
          });
      }
    }
  }

  $scope.listarColaboradores = function(){
    $http.get($rootScope.url+"colaborador/listarTodos").then(function(response){
        $scope.colaboradores = response.data;
      }, function(erro){
        console.log(erro);
      });
  }

  $scope.listarItens = function(){
    $http.get($rootScope.url+"item/listarTodos").then(function(response){
  			$scope.itens = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

  $scope.listarItens();
  $scope.listarColaboradores();

  $scope.cancelar = function(){
    $scope.click = false;
    $scope.clickItem = false;
    if($rootScope.tarefa == undefined || $rootScope.tarefa == null)
      $location.path('/servicosLista');
    else {
      $rootScope.tarefa = undefined;
      $location.path('/tarefasLista');
    }
  }

  $scope.adicionarItem = function(){
    if($scope.itemTarefa.item != undefined && $scope.itemTarefa.item.quantidade != undefined && $scope.itemTarefa.item.garantia != undefined){
      $scope.tarefa.itemTarefa.push($scope.itemTarefa);
      $scope.itemTarefa = undefined;
    }
  }

  $scope.removerItem = function(peca, index){
    $scope.tarefa.itemTarefa.splice(index, 1);
  }

});
