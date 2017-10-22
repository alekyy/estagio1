angular.module('app').controller('montarItemController', function ($scope, $http, $rootScope, Notification){

  $scope.item = {};
  $scope.itens = [];
  $scope.pecas = [];
  $scope.historico = {};
  $scope.itensMontados = [];
  $scope.form = true;
  $scope.panel = true;
  $scope.itensPossiveis = 0;
  $scope.itemMontado = {};
  $scope.click = false;

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

  $scope.listarItensMontados = function(item){
    $http.get($rootScope.url+"item/itensMontados/" + item.id).then(function(response){
      console.log(item);
      console.log($scope.itensMontados);
        $scope.itensMontados = response.data;
        $scope.historico = item;
      }, function(erro){
        console.log(erro);
      });
  }

  $scope.listarItensPossiveis = function(item){
    $http.post($rootScope.url+"item/listarItensPossiveis", item).then(function(response){
      console.log(response.data);
        $scope.itensPossiveis = response.data;
      }, function(erro){
        console.log(erro);
      });
  }

$scope.listarPecas();
$scope.listarItens();

$scope.inserirNovosItens = function(){
  if(!$scope.myform.$invalid){
    $scope.itemMontado.item = $scope.item;
    $scope.itemMontado.responsavel = $rootScope.usuarioLogado;
    $http.post($rootScope.url+"item/montarItem", $scope.itemMontado).then(function(response){
      $scope.listarItens();
      $scope.listarPecas();
      $scope.panel = true;
      $scope.item = {};
      $scope.itemMontado = {};
      Notification.success({message: 'Item montado com sucesso!',
           positionY: 'bottom', positionX: 'right', delay: 3000});
      }, function(erro){
        if(erro.status == 401){
          Notification.error({message: 'Estoque insuficiente para montar a quantidade desejada de itens.',
             positionY: 'bottom', positionX: 'right', delay: 3000});
        }
           else{
             Notification.error({message: 'Ocorreu um erro ao tentar inserir o registro.',
             positionY: 'bottom', positionX: 'right', delay: 3000});
           }
        console.log(erro);
      });
  }
}


  $scope.montarItem = function(obj){
    $scope.item = obj;
    console.log($scope.item);
    $scope.listarItensPossiveis($scope.item);
    $scope.panel = false;
  }

  $scope.cancelar = function(){
    $scope.item = {};
    $scope.itemMontado = {};
    $scope.panel = true;
    $scope.click = false;
  }


});
