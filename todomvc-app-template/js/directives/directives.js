(function (angular) {
	//自定义指令模块
	var app=angular.module('todo.directive',[]);
		//创建自动获取焦点指令
		app.directive('autoFocus',['$timeout',function ($timeout) {
			return {
				link: function (scope,element,attributes) {
					element.on('dblclick', function () {
						var item=element.parent().next().children();
						console.dir(item);
						//$timeout相当于setTimeOut()
						$timeout(function () {
							item[0].focus();
						},500)
					});
				}
			}
		}])
})(angular);
