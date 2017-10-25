angular.module('app').controller('loginController', function (Notification, $scope, $http, $rootScope, $location){

  $scope.usuario = {};

  $rootScope.usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado'));

  console.log($rootScope.usuarioLogado);

    $scope.logar = function(){
      $http.post($rootScope.url+"login/login", $scope.usuario).then(function(response){
        console.log(response.data);
        window.localStorage.setItem('usuarioLogado', JSON.stringify(response.data[0]));
        $location.path('/');
        }, function(erro){
          if(erro.status == 401){
            Notification.error({message: 'Login ou senha incorretos.',
               positionY: 'bottom', positionX: 'right', delay: 3000});
          }
             else{
               Notification.error({message: 'Ocorreu um erro na autenticação, por favor tente novamente.',
               positionY: 'bottom', positionX: 'right', delay: 3000});
             }
          console.log(erro);
        });
    }


});
