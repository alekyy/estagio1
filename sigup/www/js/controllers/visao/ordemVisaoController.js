angular.module('app').controller('ordemVisaoController', function ($scope, $location, $http, $rootScope){

      $scope.ordem = $rootScope.ordem;
      $scope.servico = {};
      $scope.panel = "";

      $scope.buscarServico = function(){
          $http.get($rootScope.url+"servico/buscarServico/"+$scope.ordem.id).then(function(response){
            console.log(response);
            $scope.servico = response.data;
            if($scope.servico.status == 'ABERTO')
              $scope.panel = "panel-primary";
            else if($scope.servico.status == 'EM_PROGRESSO')
              $scope.panel = "panel-yellow";
            else if($scope.servico.status == 'FINALIZADO')
              $scope.panel = "panel-green";
          }, function(erro){
        			console.log(erro);
        	});
      }

      $scope.visualizar = function(){
        $rootScope.servico = $scope.servico;
        $location.path('/servicoVisao');
      }

      $scope.voltar = function(){
        $rootScope.ordem = undefined;
        $location.path('/');
      }

      $scope.buscarServico();

});
