
import home from 'Scripts/Components/home/homeSvc.js';
import tableWidget from 'Scripts/Components/tableWidget/tableWidgetSvc.js';
import sparkWidget from 'Scripts/Components/sparkWidget/sparkWidgetSvc.js';
import perItemWidget from 'Scripts/Components/perItemWidget/perItemWidgetSvc.js';
import perTableWidget from 'Scripts/Components/perTableWidget/perTableWidgetSvc.js';

var moduleName='app.services';

angular.module(moduleName,[])
.factory('homeSvc', home)
.factory('tableWidgetSvc', tableWidget)
.factory('sparkWidgetSvc', sparkWidget)
.factory('perItemWidgetSvc', perItemWidget)
.factory('perTableWidgetSvc', perTableWidget);

export default moduleName;