angular.module('app').controller('itemController', function ($scope, $http, $rootScope, Notification){

  $scope.item = {};
  $scope.item.itemPeca = [];
  $scope.itemPeca = {};
  $scope.itens = [];
  $scope.pecas = [];
  $scope.form = true;

  $scope.listarItens = function(){
    $http.get($rootScope.url+"item/listarTodos").then(function(response){
  			$scope.itens = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

  $scope.listarPecas = function(){
    $http.get($rootScope.url+"peca/listarTodos").then(function(response){
        $scope.pecas = response.data;
      }, function(erro){
        console.log(erro);
      });
  }

$scope.listarPecas();
$scope.listarItens();

  $scope.salvar = function(){
    if(!$scope.myform.$invalid && $scope.item.itemPeca.length != 0){
      if($scope.item.id == undefined || $scope.item.id == null){
        $scope.item.estoque = 0;
        $http.post($rootScope.url+"item/inserir", $scope.item).then(function(response){
          $scope.listarItens();
          $scope.cancelar();
          Notification.success({message: 'Cadastro efetuado com sucesso!',
           positionY: 'bottom', positionX: 'right', delay: 3000});
  				}, function(erro){
  					console.log(erro);
            Notification.error({message: 'Ocorreu um erro ao tentar inserir o registro.',
               positionY: 'bottom', positionX: 'right', delay: 3000});
  				});
      }else{
        $http.put($rootScope.url+"item/alterar", $scope.item).then(function(response){
          $scope.listarItens();
          $scope.cancelar();
          Notification.success({message: 'Registro alterado com sucesso!',
           positionY: 'bottom', positionX: 'right', delay: 3000});
          }, function(erro){
            console.log(erro);
            Notification.error({message: 'Ocorreu um erro ao tentar alterar o registro.',
             positionY: 'bottom', positionX: 'right', delay: 3000});
          });
      }
    }
  }

  $scope.alterar = function(obj){
    $scope.item = angular.copy(obj);
    $scope.form = false;
  }

  $scope.excluir = function(id){
      $http.delete($rootScope.url+"item/excluir/"+id).then(function(response){
        $scope.listarItens();
        Notification.success({message: 'Registro excluido com sucesso!',
         positionY: 'bottom', positionX: 'right', delay: 3000});
      }, function(erro){
    					console.log(erro);
              Notification.error({message: 'Ocorreu um erro ao tentar excluir o registro.',
          positionY: 'bottom', positionX: 'right', delay: 3000});
    	});
  }


  $scope.adicionarPeca = function(){
    if($scope.itemPeca.quantidade != undefined && $scope.itemPeca.peca != undefined){
    $scope.item.itemPeca.push($scope.itemPeca);
    $scope.itemPeca = undefined;
    }
  }

  $scope.removerPecas = function(itemPeca, index){
    $scope.item.itemPeca.splice(index, 1);
  }

  $scope.cancelar = function(){
    $scope.item = {};
    $scope.item.itemPeca = [];
    $scope.itemPeca = {};
    $scope.form = true;
    $scope.click = false;
  }

});
