angular.module('app').controller('loginController', function ($scope, $http, $rootScope, $location){

  $scope.usuario = {};

    $scope.logar = function(){
      $http.post($rootScope.url+"login/login", $scope.usuario).then(function(response){
        console.log(response.data);
        window.localStorage.setItem('usuarioLogado', JSON.stringify(response.data[0]));
        $location.path('/');
        }, function(erro){
          console.log(erro);
        });
    }


});
