angular.module('app').controller('compraController', function ($scope, $http, $rootScope){

  $scope.compra = {};
  $scope.compras = [];
  $scope.pecas = [];
  $scope.form = true;
  $scope.formButtons = false;
  $scope.compraAvulsa = false;
  $scope.compraPeca = false;

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
    $scope.compra.usuario = $rootScope.usuarioLogado.usuario;
    if($scope.compra.id == undefined || $scope.compra.id == null){
      $http.post($rootScope.url+"compra/inserir", $scope.compra).then(function(response){
        $scope.listarCompras();
        $scope.cancelar();
				}, function(erro){
					console.log(erro);
				});
    }else{
      $scope.compra.dataCompra = (new Date($scope.compra.dataCompra.split('/').splice(1, 1)[0]+" "+$scope.compra.dataCompra.split('/').splice(0, 1)[0]+" "+$scope.compra.dataCompra.split('/').splice(2, 2)[0])).getTime();
      $http.put($rootScope.url+"compra/alterar", $scope.compra).then(function(response){
        $scope.listarCompras();
        $scope.cancelar();
        }, function(erro){
          console.log(erro);
        });
    }
  }

  $scope.alterar = function(obj){
    $scope.compra = angular.copy(obj);
    $scope.form = false;
    if($scope.compra.descricao != undefined)
      $scope.compraA();
    else
      $scope.compraB();
  }

  $scope.excluir = function(id){
      $http.delete($rootScope.url+"compra/excluir/"+id).then(function(response){
        $scope.listarCompras();
      }, function(erro){
    					console.log(erro);
    	});
  }

  $scope.compraA = function(){
    $scope.form = false;
    $scope.compraAvulsa = true;
    $scope.compraPeca = false;

    $scope.compra.peca = null;
    $scope.compra.quantidade = null;
  }

  $scope.compraB = function(){
    $scope.form = false;
    $scope.compraAvulsa = false;
    $scope.compraPeca = true;

    $scope.compra.descricao = null;
    $scope.compra.valor = null;
  }

  $scope.cancelar = function(){
    $scope.compra = {};
    $scope.form = true;
    $scope.compraAvulsa = false;
    $scope.compraPeca = false;
  }

});
