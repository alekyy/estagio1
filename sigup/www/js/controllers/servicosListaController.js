angular.module('app').controller('servicosListaController', function ($scope, $location, $http, $rootScope, $route){

  $scope.servicosAbertos = [];
  $scope.servicosProgresso = [];
  $scope.servicosFinalizados = [];
  $scope.templateListas = false;
  $scope.listaDeServicos = true;
  $scope.filtro = "";
  $scope.listaServicos = [];
  $scope.usuarioLogado = $rootScope.usuarioLogado.usuario;

      $scope.listarServicosEmAberto = function(){
        $http.get($rootScope.url+"servico/listarAbertos").then(function(response){
          if(response.data.length > 0){
            response.data.forEach(function(item){
              var date = new Date(item.dataInicio);
              item.dataInicio = ("0" + date.getDate()).substr(-2) + "/" + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear();
            });
          }
            $scope.servicosAbertos = response.data;
          }, function(erro){
            console.log(erro);
          });
      }

      $scope.listarServicosEmProgresso = function(){
        $http.get($rootScope.url+"servico/listarProgresso").then(function(response){
          if(response.data.length > 0){
            response.data.forEach(function(item){
              var date = new Date(item.dataInicio);
              item.dataInicio = ("0" + date.getDate()).substr(-2) + "/" + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear();
          });
          }
          console.log(response.data);
            $scope.servicosProgresso = response.data;
          }, function(erro){
            console.log(erro);
          });
      }

      $scope.listarServicosFinalizados = function(){
        $http.get($rootScope.url+"servico/listarFinalizados").then(function(response){
          if(response.data.length > 0){
            response.data.forEach(function(item){
              var date = new Date(item.dataInicio);
              item.dataInicio = ("0" + date.getDate()).substr(-2) + "/" + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear();
          });
          }
            $scope.servicosFinalizados = response.data;
          }, function(erro){
            console.log(erro);
          });
      }

      $scope.verDetalhes = function(lista){
        $scope.templateListas = true;
        $scope.listaDeServicos = false;

          if(lista == "abertos"){
            $scope.filtro = "Serviços em Aberto";
            $scope.listaServicos = $scope.servicosAbertos;
          }else if(lista == "progresso"){
            $scope.filtro = "Serviços em Progresso";
            $scope.listaServicos = $scope.servicosProgresso;
          }else if(lista == "finalizados"){
            $scope.filtro = "Serviços Concluidos";
            $scope.listaServicos = $scope.servicosFinalizados;
          }
      }

      $scope.verListas = function(){
        $scope.templateListas = false;
        $scope.listaDeServicos = true;
      }

      $scope.alterar = function(obj){
        $location.path('/servico');
        $rootScope.servico = obj;
      }

      $scope.excluir = function(id){
          $http.delete($rootScope.url+"servico/excluir/"+id).then(function(response){
            $route.reload();
          }, function(erro){
        			console.log(erro);
        	});
      }

      $scope.gerarTarefas = function(obj){
          $rootScope.servico = obj;
          $location.path('/tarefa');
      }

      $scope.visualizar = function(obj){
        $rootScope.servico = obj;
        $location.path('/servicoVisao');
      }

      $scope.listarServicosEmAberto();
      $scope.listarServicosEmProgresso();
      $scope.listarServicosFinalizados();

});
