angular.module('app').controller('pecaController', function ($scope, $http, $rootScope){

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
  				}, function(erro){
  					console.log(erro);
  				});
      }else{
        $http.put($rootScope.url+"peca/alterar", $scope.peca).then(function(response){
          $scope.listarPecas();
          $scope.cancelar();
          }, function(erro){
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
      }, function(erro){
    					console.log(erro);
    	});
  }

  $scope.cancelar = function(){
    $scope.peca = {};
    $scope.form = true;
    $scope.click = false;
  }

});
