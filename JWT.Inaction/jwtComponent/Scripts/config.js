
export default function config(stateprovider, routeProvider){
	routeProvider.otherwise('comLayout/tableNav');

	stateprovider.state('root',{abstract:true,url:'/root',templateUrl:'Scripts/Layouts/root/root.html',controller:'rootCtrl as vm'});
	stateprovider.state('comLayout',{abstract:true,url:'/comLayout',templateUrl:'Scripts/Layouts/comLayout/comLayout.html',controller:'comLayoutCtrl as vm'});

	stateprovider.state('root.home',{url:'/home',templateUrl:'Scripts/Components/home/home.html',controller:'homeCtrl as vm'});
	stateprovider.state('root.login',{url:'/login',templateUrl:'Scripts/Components/login/login.html',controller:'loginCtrl as vm'});
	stateprovider.state('root.signup',{url:'/signup',templateUrl:'Scripts/Components/signup/signup.html',controller:'signupCtrl as vm'});
	stateprovider.state('associate',{url:'/associate',templateUrl:'Scripts/Components/associate/associate.html',controller:'associateCtrl as vm'});
	stateprovider.state('comLayout.tableNav',{url:'/tableNav',templateUrl:'Scripts/Components/tableWidget/tableWidget.html',controller:'tableWidgetCtrl as vm'});
	stateprovider.state('comLayout.sparkNav',{url:'/sparkNav',templateUrl:'Scripts/Components/sparkWidget/sparkWidget.html',controller:'sparkWidgetCtrl as vm'});
	stateprovider.state('comLayout.testModuleNav',{url:'/testModuleNav',templateUrl:'Scripts/Components/testModuleWidget/testModuleWidget.html',controller:'testModuleWidgetCtrl as vm'});
}
config.$inject=['$stateProvider', '$urlRouterProvider'];
