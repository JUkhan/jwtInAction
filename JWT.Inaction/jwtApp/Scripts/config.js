
export default function config(stateprovider, routeProvider){
	routeProvider.otherwise('login');

	stateprovider.state('root',{abstract:true,url:'/root',templateUrl:'template/root__LAYOUT__',controller:'rootCtrl as vm'});

	stateprovider.state('root.home',{url:'/home',templateUrl:'template/home',controller:'homeCtrl as vm'});
	stateprovider.state('login',{url:'/login',templateUrl:'template/login',controller:'loginCtrl as vm'});
	stateprovider.state('signup',{url:'/signup',templateUrl:'template/signup',controller:'signupCtrl as vm'});
	stateprovider.state('associate',{url:'/associate',templateUrl:'template/associate',controller:'associateCtrl as vm'});
	stateprovider.state('root.chartNav',{url:'/chartNav',templateUrl:'template/chatWidget',controller:'chatWidgetCtrl as vm'});
	stateprovider.state('root.WidgetViewNav',{url:'/WidgetViewNav',templateUrl:'template/WidgetViewRights',controller:'WidgetViewRightsCtrl as vm'});
}
config.$inject=['$stateProvider', '$urlRouterProvider'];
