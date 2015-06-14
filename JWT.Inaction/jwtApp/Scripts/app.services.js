
import home from 'Scripts/Components/home/homeSvc.js';
import chatWidget from 'Scripts/Components/chatWidget/chatWidgetSvc.js';
import WidgetViewRights from 'Scripts/Components/WidgetViewRights/WidgetViewRightsSvc.js';

var moduleName='app.services';

angular.module(moduleName,[])
.factory('homeSvc', home)
.factory('chatWidgetSvc', chatWidget)
.factory('WidgetViewRightsSvc', WidgetViewRights);

export default moduleName;