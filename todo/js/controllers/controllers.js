(function (angular) {

	//所有控制器模块
	angular.module('todo.controller',[])
	.controller('todoController', ['$scope', '$location','myService', function ($scope, $location,myService) {

 //    1.展示任务列表 ng-repeat
 //    2.添加任务 id,是否唯一
 //    3.删除任务
 //    4.编辑任务  双向数据绑定(只需要控制编辑的文本框的显示与否)
 //    5.切换任务是否完成的状态(双向数据绑定);
 //    6.批量切换任务是否完成的状态
 //    7.删除所有已完成任务
 //        7.1控制删除按钮的显示与否
 //        ng-show也可以指定一个函数，会根据函数的返回值显示或隐藏内容。
 //    8.显示未完成的任务数
 //    9.切换不同状态任务的显示

		//1从service模块中从拿取数据
		$scope.data = myService.get()

		//2添加任务
		$scope.value = '';
		$scope.add = function () {
			if (!$scope.value) {//如果内容为空则不执行下面的代码
				return;
			}
			var id;//设置添加内容的id值要保证唯一性
			if ($scope.data.length > 0) {
				id = $scope.data[$scope.data.length - 1].id + 1;
			} else {
				id = 1;
			}
			//把添加任务的内容和id传到service模块中,让其保存数据
			myService.add(id,$scope.value);
			//保存后让其内容为空
			$scope.value = '';
		};

		//3删除任务
		$scope.remove = function (id) {
			//把要删除的任务的id传到service模块中，让其删除数据
			myService.remove(id);
		};

		//4编辑任务，利用双向数据绑定让它自己保存数据
		//我们只控制class样式editing显示与否
		//刚开始全部隐藏<0的值都可以
		$scope.isEditing = -1;
		$scope.edit = function (id) {
			$scope.isEditing = id;
		};
		//按下回车清除editing样式
		$scope.save = function () {
			$scope.isEditing = -1;
		};

		//6批量切换任务
		//标记
		var falg=true;
		$scope.editAll = function () {
			//把标记传到service中，让其所有的数据都保持falg状态
			myService.toggleAll(falg);
			falg=!falg
			return falg;

		}

		//7清楚所有已经完成的任务
		$scope.clearCompleted = function () {
			//重新从service拿未完成的数据
			$scope.data=myService.clearCompleted();
		};

		//7.1 遍历数组，判断只要有一个元素的status的属性为true就显示按钮
		$scope.isShow = function () {
			//从service确认显示与否
			return myService.isShow();
		};

		//8显示未完成的任务数
		$scope.count = function () {
			//从service拿未完成任务的数量
			return myService.count();
		};

		//$watch只能监视$scope的数据模型,不能直接赋值，不然监视的固定的值
		$scope.loca = $location;
		//用来过滤的条件
		$scope.statu = {};
		//9.angular内部允许我们直接监视方法，只要锚点值有变化就会触发这个回调函数
		$scope.$watch('loca.url()', function (now, old) {
			//now是锚点值发生变化后#号后面的字符窜
			switch (now) {
				case '/active':
					$scope.statu = {status: false};
					break;
				case '/completed':
					$scope.statu = {status: true};
					break;
				default:
					$scope.statu = {};
					break;
			}
		});
	}]);
})(angular)
