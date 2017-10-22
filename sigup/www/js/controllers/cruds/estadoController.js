angular.module('app').controller('estadoController', function ($scope, $http, $rootScope, Notification){

  $scope.estado = {};
  $scope.estados = [];
  $scope.form = true;
  $scope.click = false;

  $scope.listarEstados = function(){
    $http.get($rootScope.url+"estado/listarTodos").then(function(response){
  			$scope.estados = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

$scope.listarEstados();

  $scope.salvar = function(){
    if(!$scope.myform.$invalid){
      if($scope.estado.id == undefined || $scope.estado.id == null){
        $http.post($rootScope.url+"estado/inserir", $scope.estado).then(function(response){
          $scope.listarEstados();
          $scope.cancelar();
          Notification.success({message: 'Cadastro efetuado com sucesso!',
           positionY: 'bottom', positionX: 'right', delay: 3000});
  				}, function(erro){
  					console.log(erro);
            Notification.error({message: 'Ocorreu um erro ao tentar inserir o registro.',
             positionY: 'bottom', positionX: 'right', delay: 3000});
  				});
      }else{
        $http.put($rootScope.url+"estado/alterar", $scope.estado).then(function(response){
          Notification.success({message: 'Registro alterado com sucesso!',
           positionY: 'bottom', positionX: 'right', delay: 3000});
          $scope.listarEstados();
          $scope.cancelar();
          }, function(erro){
            Notification.error({message: 'Ocorreu um erro ao tentar alterar o registro.',
             positionY: 'bottom', positionX: 'right', delay: 3000});
            console.log(erro);
          });
      }
    }
  }

  $scope.alterar = function(obj){
    $scope.estado = angular.copy(obj);
    $scope.form = false;
  }

  $scope.excluir = function(id){
      $http.delete($rootScope.url+"estado/excluir/"+id).then(function(response){
        $scope.listarEstados();
        Notification.success({message: 'Registro excluido com sucesso!',
         positionY: 'bottom', positionX: 'right', delay: 3000});
      }, function(erro){
    					console.log(erro);
              Notification.error({message: 'Ocorreu um erro ao tentar excluir o registro.',
          positionY: 'bottom', positionX: 'right', delay: 3000});
    	});
  }

  $scope.cancelar = function(){
    $scope.estado = {};
    $scope.form = true;
    $scope.click = false;
  }

});
