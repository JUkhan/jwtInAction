import comInstaller from 'Scripts/Directives/comInstaller/comInstaller.js';
import jwtFilter from 'Scripts/Directives/jwtFilter/jwtFilter.js';
import sparkLine from 'Scripts/Directives/sparkLine/sparkLine.js';
import tableCom from 'Scripts/Directives/tableCom/tableCom.js';


var moduleName='app.Directives';

angular.module(moduleName, [])
.directive('comInstaller', comInstaller.builder)
.directive('jwtFilter', jwtFilter.builder)
.directive('sparkLine', sparkLine.builder)
.directive('tableCom', tableCom.builder)
;

export default moduleName;