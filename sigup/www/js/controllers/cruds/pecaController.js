angular.module('app').controller('pecaController', function ($scope, $http, $rootScope, Notification){

  $scope.peca = {};
  $scope.pecas = [];
  $scope.form = true;
  $scope.click = false;

  $scope.listarPecas = function(){
    $http.get($rootScope.url+"peca/listarTodos").then(function(response){
  			$scope.pecas = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

$scope.listarPecas();

  $scope.salvar = function(){
    if(!$scope.myform.$invalid){
      if($scope.peca.id == undefined || $scope.peca.id == null){
        $scope.peca.estoque = 0;
        $http.post($rootScope.url+"peca/inserir", $scope.peca).then(function(response){
          $scope.listarPecas();
          $scope.cancelar();
          Notification.success({message: 'Cadastro efetuado com sucesso!',
           positionY: 'bottom', positionX: 'right', delay: 3000});
  				}, function(erro){
            Notification.error({message: 'Ocorreu um erro ao tentar inserir o registro.',
               positionY: 'bottom', positionX: 'right', delay: 3000});
  					console.log(erro);
  				});
      }else{
        $http.put($rootScope.url+"peca/alterar", $scope.peca).then(function(response){
          $scope.listarPecas();
          $scope.cancelar();
          Notification.success({message: 'Registro alterado com sucesso!',
           positionY: 'bottom', positionX: 'right', delay: 3000});
          }, function(erro){
            Notification.error({message: 'Ocorreu um erro ao tentar alterar o registro.',
             positionY: 'bottom', positionX: 'right', delay: 3000});
            console.log(erro);
          });
      }
    }
  }

  $scope.alterar = function(obj){
    $scope.peca = angular.copy(obj);
    $scope.form = false;
  }

  $scope.excluir = function(id){
      $http.delete($rootScope.url+"peca/excluir/"+id).then(function(response){
        $scope.listarPecas();
        Notification.success({message: 'Registro excluido com sucesso!',
         positionY: 'bottom', positionX: 'right', delay: 3000});
      }, function(erro){
        Notification.error({message: 'Ocorreu um erro ao tentar excluir o registro.',
          positionY: 'bottom', positionX: 'right', delay: 3000});
    					console.log(erro);
    	});
  }

  $scope.cancelar = function(){
    $scope.peca = {};
    $scope.form = true;
    $scope.click = false;
  }

});
