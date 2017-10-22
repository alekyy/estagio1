angular.module('app').controller('empresaController', function ($scope, $http, $rootScope, Notification){

  $scope.empresa = {};
  $scope.empresas = [];
  $scope.cidades = [];
  $scope.form = true;
  $scope.click = false;

  $scope.listarEmpresas = function(){
    $http.get($rootScope.url+"empresa/listarTodos").then(function(response){
  			$scope.empresas = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

  $scope.listarCidades = function(){
    $http.get($rootScope.url+"cidade/listarTodos").then(function(response){
  			$scope.cidades = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

  $scope.listarProdutos = function(){
    $http.get($rootScope.url+"produto/listarTodos").then(function(response){
  			$scope.produtos = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

$scope.listarCidades();
$scope.listarProdutos();
$scope.listarEmpresas();

  $scope.salvar = function(){
    if(!$scope.myform.$invalid){
      if($scope.empresa.id == undefined || $scope.empresa.id == null){
        $http.post($rootScope.url+"empresa/inserir", $scope.empresa).then(function(response){
          Notification.success({message: 'Cadastro efetuado com sucesso!',
           positionY: 'bottom', positionX: 'right', delay: 3000});
          $scope.listarEmpresas();
          $scope.cancelar();
  				}, function(erro){
            Notification.error({message: 'Ocorreu um erro ao tentar inserir o registro.',
             positionY: 'bottom', positionX: 'right', delay: 3000});
  					console.log(erro);
  				});
      }else{
        $http.put($rootScope.url+"empresa/alterar", $scope.empresa).then(function(response){
          $scope.listarEmpresas();
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
    $scope.empresa = angular.copy(obj);
    $scope.form = false;
  }

  $scope.excluir = function(id){
      $http.delete($rootScope.url+"empresa/excluir/"+id).then(function(response){
        $scope.listarEmpresas();
        Notification.success({message: 'Registro excluido com sucesso!',
         positionY: 'bottom', positionX: 'right', delay: 3000});
      }, function(erro){
    					console.log(erro);
              Notification.error({message: 'Ocorreu um erro ao tentar excluir o registro.',
          positionY: 'bottom', positionX: 'right', delay: 3000});
    	});
  }

  $scope.cancelar = function(){
    $scope.empresa = {};
    $scope.form = true;
    $scope.click = false;
  }

});
