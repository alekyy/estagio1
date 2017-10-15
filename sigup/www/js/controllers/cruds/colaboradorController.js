angular.module('app').controller('colaboradorController', function ($scope, $http, $rootScope){

  $scope.colaborador = {};
  $scope.colaboradores = [];
  $scope.cidades = [];
  $scope.form = true;
  $scope.click = false;

  $scope.listarColaboradores = function(){
    $http.get($rootScope.url+"colaborador/listarTodos").then(function(response){
  			$scope.colaboradores = response.data;
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

$scope.listarCidades();
$scope.listarColaboradores();

  $scope.salvar = function(){
    if(!$scope.myform.$invalid){
      if($scope.colaborador.id == undefined || $scope.colaborador.id == null){
        $http.post($rootScope.url+"colaborador/inserir", $scope.colaborador).then(function(response){
          $scope.listarColaboradores();
          $scope.cancelar();
  				}, function(erro){
  					console.log(erro);
  				});
      }else{
        $http.put($rootScope.url+"colaborador/alterar", $scope.colaborador).then(function(response){
          $scope.listarColaboradores();
          $scope.cancelar();
          }, function(erro){
            console.log(erro);
          });
      }
    }
  }


  $scope.alterar = function(obj){
    if(obj.dataNascimento != undefined){
    obj.dataNascimento = new Date(obj.dataNascimento);
  }
    $scope.colaborador = angular.copy(obj);
    $scope.form = false;
  }

  $scope.excluir = function(id){
      $http.delete($rootScope.url+"colaborador/excluir/"+id).then(function(response){
        $scope.listarColaboradores();
      }, function(erro){
    					console.log(erro);
    	});
  }

  $scope.cancelar = function(){
    $scope.colaborador = {};
    $scope.form = true;
    $scope.click = false;
  }

});
