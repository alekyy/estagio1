angular.module('app').controller('cidadeController', function ($scope, $http, $rootScope, Notification){

  $scope.cidade = {};
  $scope.cidades = [];
  $scope.estados = [];
  $scope.form = true;
  $scope.click = false;

  $scope.listarCidades = function(){
    $http.get($rootScope.url+"cidade/listarTodos").then(function(response){
  			$scope.cidades = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

  $scope.listarEstados = function(){
    $http.get($rootScope.url+"estado/listarTodos").then(function(response){
  			$scope.estados = response.data;
  		}, function(erro){
  			console.log(erro);
  		});
  }

$scope.listarEstados();
$scope.listarCidades();

  $scope.salvar = function(){
    if(!$scope.myform.$invalid){
      if($scope.cidade.id == undefined || $scope.cidade.id == null){
        $http.post($rootScope.url+"cidade/inserir", $scope.cidade).then(function(response){
          Notification.success({message: 'Cadastro efetuado com sucesso!',
           positionY: 'bottom', positionX: 'right', delay: 3000});
          $scope.listarCidades();
          $scope.cancelar();
  				}, function(erro){
            Notification.error({message: 'Ocorreu um erro ao tentar inserir o registro.',
             positionY: 'bottom', positionX: 'right', delay: 3000});
  					console.log(erro);
  				});
      }else{
        $http.put($rootScope.url+"cidade/alterar", $scope.cidade).then(function(response){
          Notification.success({message: 'Registro alterado com sucesso!',
           positionY: 'bottom', positionX: 'right', delay: 3000});
          $scope.listarCidades();
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
    $scope.cidade = angular.copy(obj);
    $scope.form = false;
  }

  $scope.excluir = function(id){
      $http.delete($rootScope.url+"cidade/excluir/"+id).then(function(response){
        $scope.listarCidades();
        Notification.success({message: 'Registro excluido com sucesso!',
         positionY: 'bottom', positionX: 'right', delay: 3000});
      }, function(erro){
    			console.log(erro);
          Notification.error({message: 'Ocorreu um erro ao tentar excluir o registro.',
          positionY: 'bottom', positionX: 'right', delay: 3000});
    	});
  }

  $scope.cancelar = function(){
    $scope.cidade = {};
    $scope.form = true;
    $scope.click = false;
  }

});
