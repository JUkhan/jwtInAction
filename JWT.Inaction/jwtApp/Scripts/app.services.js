
import home from 'Scripts/Components/home/homeSvc.js';
import chatWidget from 'Scripts/Components/chatWidget/chatWidgetSvc.js';
import WidgetViewRights from 'Scripts/Components/WidgetViewRights/WidgetViewRightsSvc.js';
import userInRoles from 'Scripts/Components/userInRoles/userInRolesSvc.js';
import Person from 'Scripts/Components/Person/PersonSvc.js';
import Products from 'Scripts/Components/Products/ProductsSvc.js';
import root from 'Scripts/Layouts/root/rootSvc.js';

var moduleName='app.services';

angular.module(moduleName,[])
.factory('homeSvc', home)
.factory('chatWidgetSvc', chatWidget)
.factory('WidgetViewRightsSvc', WidgetViewRights)
.factory('userInRolesSvc', userInRoles)
.factory('PersonSvc', Person)
.factory('ProductsSvc', Products)
.factory('rootSvc', root);

export default moduleName;