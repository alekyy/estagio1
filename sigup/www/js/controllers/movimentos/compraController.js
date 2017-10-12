angular.module('app').controller('compraController', function ($scope, $http, $rootScope){

  $scope.compra = {};
  $scope.compra.pecaCompra = [];
  $scope.compras = [];
  $scope.pecaCompra = {};
  $scope.pecas = [];
  $scope.form = true;

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

  $scope.adicionarPeca = function(){
    $scope.compra.pecaCompra.push($scope.pecaCompra);
    $scope.pecaCompra = undefined;
  }

  $scope.removerPecas = function(peca, index){
    $scope.compra.pecaCompra.splice(index, 1);
  }

  $scope.cancelar = function(){
    $scope.compra = {};
    $scope.form = true;
  }

});
