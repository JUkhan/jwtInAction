
import home from 'Scripts/Components/home/homeSvc.js';
import tableWidget from 'Scripts/Components/tableWidget/tableWidgetSvc.js';
import sparkWidget from 'Scripts/Components/sparkWidget/sparkWidgetSvc.js';
import testModuleWidget from 'Scripts/Components/testModuleWidget/testModuleWidgetSvc.js';

var moduleName='app.services';

angular.module(moduleName,[])
.factory('homeSvc', home)
.factory('tableWidgetSvc', tableWidget)
.factory('sparkWidgetSvc', sparkWidget)
.factory('testModuleWidgetSvc', testModuleWidget);

export default moduleName;