angular.module('app').controller('clienteController', function ($scope, $http, $rootScope, Notification){

  $scope.cliente = {};
  $scope.clientes = [];
  $scope.form = true;
  $scope.click = false;

  $scope.listarClientes = function(){
    $http.get($rootScope.url+"cliente/listarTodos").then(function(response){
  			$scope.clientes = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

  $scope.listarEmpresas = function(){
    $http.get($rootScope.url+"empresa/listarTodos").then(function(response){
  			$scope.empresas = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

$scope.listarEmpresas();
$scope.listarClientes();

  $scope.salvar = function(){
    if(!$scope.myform.$invalid){
      if($scope.cliente.id == undefined || $scope.cliente.id == null){
        $http.post($rootScope.url+"cliente/inserir", $scope.cliente).then(function(response){
          Notification.success({message: 'Cadastro efetuado com sucesso!',
           positionY: 'bottom', positionX: 'right', delay: 3000});
          $scope.listarClientes();
          $scope.cancelar();
  				}, function(erro){
            Notification.error({message: 'Ocorreu um erro ao tentar inserir o registro.',
             positionY: 'bottom', positionX: 'right', delay: 3000});
  					console.log(erro);
  				});
      }else{
        $http.put($rootScope.url+"cliente/alterar", $scope.cliente).then(function(response){
          Notification.success({message: 'Registro alterado com sucesso!',
           positionY: 'bottom', positionX: 'right', delay: 3000});
          $scope.listarClientes();
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
    $scope.cliente = angular.copy(obj);
    $scope.form = false;
  }

  $scope.excluir = function(id){
      $http.delete($rootScope.url+"cliente/excluir/"+id).then(function(response){
        $scope.listarClientes();
        Notification.success({message: 'Registro excluido com sucesso!',
         positionY: 'bottom', positionX: 'right', delay: 3000});
      }, function(erro){
    					console.log(erro);
              Notification.error({message: 'Ocorreu um erro ao tentar excluir o registro.',
          positionY: 'bottom', positionX: 'right', delay: 3000});
    	});
  }

  $scope.cancelar = function(){
    $scope.cliente = {};
    $scope.form = true;
    $scope.click = false;
  }

});
