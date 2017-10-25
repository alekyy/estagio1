angular.module('app').controller('dashboardController', function ($scope, $location, $http, $rootScope, $window, $sce){

  $rootScope.usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado'));

  if($rootScope.usuarioLogado == undefined || $rootScope.usuarioLogado == null)
      $location.path('/login');

  $scope.ordensAbertas = [];
  $scope.ordensProgresso = [];
  $scope.ordensFinalizadas = [];
  $scope.templateListas = false;
  $scope.listaDeOrdens = true;
  $scope.filtro = "";
  $scope.listaOrdens = [];
  if($rootScope.usuarioLogado != undefined && $rootScope.usuarioLogado != null)
  $scope.usuarioLogado = $rootScope.usuarioLogado.usuario;
  $rootScope.ordem = undefined;

      $scope.novaOrdem = function(){
        $location.path('/ordem');
      }

      $scope.listarOrdensEmAberto = function(){
        $http.get($rootScope.url+"ordem/listarAbertos").then(function(response){
          if(response.data.length > 0){
            response.data.forEach(function(item){
              var date = new Date(item.dataCriacao);
              item.dataCriacao = ("0" + date.getDate()).substr(-2) + "/" + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear();
            });
          }
            $scope.ordensAbertas = response.data;
          }, function(erro){
            console.log(erro);
          });
      }

      $scope.listarOrdensEmProgresso = function(){
        $http.get($rootScope.url+"ordem/listarProgresso").then(function(response){
          if(response.data.length > 0){
            response.data.forEach(function(item){
              var date = new Date(item.dataCriacao);
              item.dataCriacao = ("0" + date.getDate()).substr(-2) + "/" + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear();
            });
          }
            $scope.ordensProgresso = response.data;
          }, function(erro){
            console.log(erro);
          });
      }

      $scope.listarOrdensFinalizadas = function(){
        $http.get($rootScope.url+"ordem/listarFinalizadas").then(function(response){
          if(response.data.length > 0){
            response.data.forEach(function(item){
              var date = new Date(item.dataCriacao);
              item.dataCriacao = ("0" + date.getDate()).substr(-2) + "/" + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear();
            });
          }
            $scope.ordensFinalizadas = response.data;
          }, function(erro){
            console.log(erro);
          });
      }

      $scope.verDetalhes = function(lista){
        $scope.templateListas = true;
        $scope.listaDeOrdens = false;

          if(lista == "abertas"){
            $scope.filtro = "Ordens em Aberto";
            $scope.listaOrdens = $scope.ordensAbertas;
          }else if(lista == "progresso"){
            $scope.filtro = "Ordens em Progresso";
            $scope.listaOrdens = $scope.ordensProgresso;
          }else if(lista == "finalizadas"){
            $scope.filtro = "Ordens Concluidas";
            $scope.listaOrdens = $scope.ordensFinalizadas;
          }
      }

      $scope.verListas = function(){
        $scope.templateListas = false;
        $scope.listaDeOrdens = true;
      }

      $scope.alterar = function(obj){
        $location.path('/ordem');
        $rootScope.ordem = obj;
      }

      $scope.excluir = function(id){
          $http.delete($rootScope.url+"ordem/excluir/"+id).then(function(response){
            $location.path('?');
          }, function(erro){
        			console.log(erro);
        	});
      }

      $scope.abrirServico = function(obj){
          obj.dataCriacao = (new Date(obj.dataCriacao.split('/').splice(1, 1)[0]+" "+obj.dataCriacao.split('/').splice(0, 1)[0]+" "+obj.dataCriacao.split('/').splice(2, 2)[0])).getTime();
          $rootScope.ordem = obj;
          $location.path('/servico');
      }

      $scope.visualizar = function(obj){
        $rootScope.ordem = obj;
        $location.path('/ordemVisao');
      }

      $scope.listarOrdensEmAberto();
      $scope.listarOrdensEmProgresso();
      $scope.listarOrdensFinalizadas();

});
