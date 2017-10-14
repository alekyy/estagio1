angular.module('app').controller('ordemVisaoController', function ($scope, $location, $http, $rootScope){

      $scope.ordem = $rootScope.ordem;
      $scope.servico = {};
      $scope.panel = "";

      $scope.buscarServico = function(){
          $http.get($rootScope.url+"servico/buscarServico/"+$scope.ordem.id).then(function(response){
            var date = new Date(response.data.dataInicio);
            response.data.dataInicio = ("0" + date.getDate()).substr(-2) + "/" + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear();
            $scope.servico = response.data;
            console.log($scope.servico);
            if($scope.servico.status == 'ABERTO')
              $scope.panel = "panel-primary";
            else if($scope.servico.status == 'EM_PROGRESSO')
              $scope.panel = "panel-yellow";
            else if($scope.servico.status == 'FINALIZADO')
              $scope.panel = "panel-green";
          }, function(erro){
              $scope.servico = undefined;
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
