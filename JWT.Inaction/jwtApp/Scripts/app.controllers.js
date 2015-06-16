
import home from 'Scripts/Components/home/homeCtrl.js';
import login from 'Scripts/Components/login/loginCtrl.js';
import signup from 'Scripts/Components/signup/signupCtrl.js';
import associate from 'Scripts/Components/associate/associateCtrl.js';
import chatWidget from 'Scripts/Components/chatWidget/chatWidgetCtrl.js';
import WidgetViewRights from 'Scripts/Components/WidgetViewRights/WidgetViewRightsCtrl.js';
import userInRoles from 'Scripts/Components/userInRoles/userInRolesCtrl.js';
import root from 'Scripts/Layouts/root/rootCtrl.js';

var moduleName='app.controllers';

angular.module(moduleName,[])
.controller('homeCtrl', home)
.controller('loginCtrl', login)
.controller('signupCtrl', signup)
.controller('associateCtrl', associate)
.controller('chatWidgetCtrl', chatWidget)
.controller('WidgetViewRightsCtrl', WidgetViewRights)
.controller('userInRolesCtrl', userInRoles)
.controller('rootCtrl', root);

export default moduleName;