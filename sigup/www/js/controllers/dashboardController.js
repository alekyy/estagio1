angular.module('app').controller('dashboardController', function ($scope, $location, $http, $rootScope){

  $scope.ordensAbertas = [];
  $scope.ordensProgresso = [];
  $scope.ordensFinalizadas = [];
  $scope.templateListas = false;
  $scope.listaDeOrdens = true;
  $scope.filtro = "";
  $scope.listaOrdens = [];

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

      $scope.listarOrdensEmAberto();
      $scope.listarOrdensEmProgresso();
      $scope.listarOrdensFinalizadas();

});
