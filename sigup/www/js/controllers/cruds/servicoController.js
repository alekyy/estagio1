angular.module('app').controller('servicoController', function ($scope, $http, $rootScope, $location, Notification){

  $scope.servico = {};
  $scope.prioridades = [1,2,3,4,5];
  $scope.click = false;

  if($rootScope.servico != undefined)
    $scope.servico = $rootScope.servico;

  $scope.salvar = function(){
    if(!$scope.myform.$invalid){
      if($scope.servico.ordem == undefined || $scope.servico.ordem == null)
        $scope.servico.ordem = $rootScope.ordem;
      if($scope.servico.id == undefined || $scope.servico.id == null){
        $http.post($rootScope.url+"servico/inserir", $scope.servico).then(function(response){
          Notification.success({message: 'Cadastro efetuado com sucesso!',
           positionY: 'bottom', positionX: 'right', delay: 3000});
          $location.path('/servicosLista');
  				}, function(erro){
            Notification.error({message: 'Ocorreu um erro ao tentar inserir o registro.',
               positionY: 'bottom', positionX: 'right', delay: 3000});
  					console.log(erro);
  				});
      }else{
        $scope.servico.dataInicio = (new Date($scope.servico.dataInicio.split('/').splice(1, 1)[0]+" "+$scope.servico.dataInicio.split('/').splice(0, 1)[0]+" "+$scope.servico.dataInicio.split('/').splice(2, 2)[0])).getTime();
        $http.put($rootScope.url+"servico/alterar", $scope.servico).then(function(response){
        $rootScope.servico = undefined;
        Notification.success({message: 'Registro alterado com sucesso!',
                   positionY: 'bottom', positionX: 'right', delay: 3000});
        $location.path('/servicosLista');
          }, function(erro){
            Notification.error({message: 'Ocorreu um erro ao tentar alterar o registro.',
             positionY: 'bottom', positionX: 'right', delay: 3000});
            console.log(erro);
          });
      }
    }
  }

  $scope.cancelar = function(){
    $scope.click = false;
    if($rootScope.servico == undefined || $rootScope.servico == null)
      $location.path('/');
    else {
      $rootScope.servico = undefined;
      $location.path('/servicosLista');
    }
  }

});
