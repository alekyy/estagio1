angular.module('app').controller('compraController', function ($scope, $http, $rootScope, Notification){

  $scope.compra = {};
  $scope.compra.pecaCompra = [];
  $scope.compras = [];
  $scope.detalhes = {};
  $scope.pecaCompra = {};
  $scope.pecas = [];
  $scope.form = true;
  $scope.click = false;

  $scope.listarCompras = function(){
    $http.get($rootScope.url+"compra/listarTodos").then(function(response){
      if(response.data.length > 0){
        response.data.forEach(function(item){
          var date = new Date(item.dataCompra);
          item.dataCompra = ("0" + date.getDate()).substr(-2) + "/" + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear();
        });
      }
  			$scope.compras = response.data;
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
$scope.listarCompras();

  $scope.salvar = function(){
    if(!$scope.myform.$invalid && $scope.compra.pecaCompra.length != 0){
      $scope.compra.usuario = $rootScope.usuarioLogado.usuario;
        $http.post($rootScope.url+"compra/inserir", $scope.compra).then(function(response){
          $scope.listarCompras();
          $scope.cancelar();
          Notification.success({message: 'Compra efetuada com sucesso!',
           positionY: 'bottom', positionX: 'right', delay: 3000});
  				}, function(erro){
            Notification.error({message: 'Ocorreu um erro ao tentar inserir o registro.',
             positionY: 'bottom', positionX: 'right', delay: 3000});
  					console.log(erro);
  				});
    }
  }

  $scope.adicionarPeca = function(){
    if($scope.pecaCompra.quantidade != undefined && $scope.pecaCompra.peca != undefined){
      $scope.compra.pecaCompra.push($scope.pecaCompra);
      $scope.pecaCompra = undefined;
    }
  }

  $scope.removerPecas = function(peca, index){
    $scope.compra.pecaCompra.splice(index, 1);
  }

  $scope.cancelar = function(){
    $scope.compra = {};
    $scope.form = true;
    $scope.click = false;
  }

  $scope.verDetalhes = function(obj){
    $scope.detalhes = obj;
  }

});
