angular.module('app').controller('produtoController', function ($scope, $http, $rootScope, Notification){

  $scope.produto = {};
  $scope.produtos = [];
  $scope.form = true;
  $scope.click = false;

  $scope.listarProdutos = function(){
    $http.get($rootScope.url+"produto/listarTodos").then(function(response){
  			$scope.produtos = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

$scope.listarProdutos();

  $scope.salvar = function(){
    if(!$scope.myform.$invalid){
      if($scope.produto.id == undefined || $scope.produto.id == null){
        $http.post($rootScope.url+"produto/inserir", $scope.produto).then(function(response){
          $scope.listarProdutos();
          $scope.cancelar();
          Notification.success({message: 'Cadastro efetuado com sucesso!',
           positionY: 'bottom', positionX: 'right', delay: 3000});
  				}, function(erro){
            Notification.error({message: 'Ocorreu um erro ao tentar inserir o registro.',
               positionY: 'bottom', positionX: 'right', delay: 3000});
  					console.log(erro);
  				});
      }else{
        $http.put($rootScope.url+"produto/alterar", $scope.produto).then(function(response){
          $scope.listarProdutos();
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
    $scope.produto = angular.copy(obj);
    $scope.form = false;
  }

  $scope.excluir = function(id){
      $http.delete($rootScope.url+"produto/excluir/"+id).then(function(response){
        $scope.listarProdutos();
        Notification.success({message: 'Registro excluido com sucesso!',
         positionY: 'bottom', positionX: 'right', delay: 3000});
      }, function(erro){
        Notification.error({message: 'Ocorreu um erro ao tentar excluir o registro.',
          positionY: 'bottom', positionX: 'right', delay: 3000});
    					console.log(erro);
    	});
  }

  $scope.cancelar = function(){
    $scope.produto = {};
    $scope.form = true;
    $scope.click = false;
  }

});
