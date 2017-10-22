var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngAria', 'ngMaterial', 'ui.utils.masks', 'ui-notification']);

app.config(function($routeProvider, $locationProvider){

	 $locationProvider.html5Mode(true); /* pode-se omitir o # na url. */

	$routeProvider.when('/', {
		templateUrl: 'pages/dashboard.html',
		controller: 'dashboardController'
	});

	$routeProvider.when('/login', {
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	});

	$routeProvider.when('/estado', {
		templateUrl: 'pages/cruds/estado.html',
		controller: 'estadoController'
	});

	$routeProvider.when('/cidade', {
		templateUrl: 'pages/cruds/cidade.html',
		controller: 'cidadeController'
	});

	$routeProvider.when('/cliente', {
		templateUrl: 'pages/cruds/cliente.html',
		controller: 'clienteController'
	});

	$routeProvider.when('/colaborador', {
		templateUrl: 'pages/cruds/colaborador.html',
		controller: 'colaboradorController'
	});

	$routeProvider.when('/empresa', {
		templateUrl: 'pages/cruds/empresa.html',
		controller: 'empresaController'
	});

	$routeProvider.when('/modulo', {
		templateUrl: 'pages/cruds/modulo.html',
		controller: 'moduloController'
	});

	$routeProvider.when('/ordem', {
		templateUrl: 'pages/cruds/ordem.html',
		controller: 'ordemController'
	});

	$routeProvider.when('/produto', {
		templateUrl: 'pages/cruds/produto.html',
		controller: 'produtoController'
	});

	$routeProvider.when('/servico', {
		templateUrl: 'pages/cruds/servico.html',
		controller: 'servicoController'
	});

	$routeProvider.when('/compra', {
		templateUrl: 'pages/movimentos/compra.html',
		controller: 'compraController'
	});

	$routeProvider.when('/peca', {
		templateUrl: 'pages/cruds/peca.html',
		controller: 'pecaController'
	});

	$routeProvider.when('/item', {
		templateUrl: 'pages/cruds/item.html',
		controller: 'itemController'
	});

	$routeProvider.when('/tarefa', {
		templateUrl: 'pages/cruds/tarefa.html',
		controller: 'tarefaController'
	});

	$routeProvider.when('/servicosLista', {
		templateUrl: 'pages/servicosLista.html',
		controller: 'servicosListaController'
	});

	$routeProvider.when('/ordemVisao', {
		templateUrl: 'pages/visao/ordemVisao.html',
		controller: 'ordemVisaoController'
	});

	$routeProvider.when('/servicoVisao', {
		templateUrl: 'pages/visao/servicoVisao.html',
		controller: 'servicoVisaoController'
	});

	$routeProvider.when('/tarefaVisao', {
		templateUrl: 'pages/visao/tarefaVisao.html',
		controller: 'tarefaVisaoController'
	});

	$routeProvider.when('/montarItem', {
		templateUrl: 'pages/movimentos/montarItem.html',
		controller: 'montarItemController'
	});

	$routeProvider.otherwise({redirectTo: '/'});
});

app.run(function($rootScope, $location) {
  $rootScope.url = "http://localhost:8080/sigup_web/";
	if(window.localStorage.getItem('usuarioLogado') == undefined)
		$location.path('/login');

	// window.localStorage.setItem('porta', '8080');
});
