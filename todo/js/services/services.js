(function(angular){
	//服务主模块
	var app=angular.module('todo.service',[]);
	//myService是这个模块的名称，要使用必须在控制器模块注入myService
	//第二个参数可以相当于一个构造函数
	app.service('myService',['$window',function ($window) {

		//获取本地存储的数据
		var storage=$window.localStorage;
		var str=storage.getItem('datas');
		var datas=JSON.parse(str||'[]');

		//把数据返回
		this.get= function () {
			return datas;
		};

		//添加数据
		this.add= function (id,value) {
			datas.push({id: id, name: value, status: false});
			this.save();//保存任务数据
		}

		//保存任务数据函数
		this.save= function () {
			storage.setItem('datas',JSON.stringify(datas));
		}

		//删除任务数据
		this.remove= function (id) {
			// 遍历数组，得到相应id的索引，并删除数据
			for (var i = 0; i < datas.length; i++) {
				var item = datas[i];
				if (item.id === id) {
					datas.splice(i, 1);
					this.save();
					return;
				}
			}
		}

		//批量切换状态
		this.toggleAll= function (falg) {
			for (var i = 0; i < datas.length; i++) {
				datas[i].status = falg;
			}
		}

		//删除已完成的任务
		this.clearCompleted= function () {
			var tmp = [];//保存没有完成的任务
			for (var i = 0; i <datas.length; i++) {
				var item =datas[i];
				if (!item.status) {
					tmp.push(item);//没完成的任务放到tmp中
				}
			}
			datas = tmp;//把没完成的任务赋给datas;
			this.save();
			return datas;
		};

		//控制按钮的显示与否
		this.isShow= function () {
			for (var i = 0, len = datas.length; i < len; i++) {
				var item = datas[i];
				if (item.status) {
					return true;
					break;
				}
			}
			return false;
		}

		//获取未完成的任务数量
		this.count= function () {
			var count = 0;
			for (var i = 0, len = datas.length; i < len; i++) {
				var item = datas[i];
				if (!item.status) {
					count++;
				}
			}
			this.save();
			return count;
		}
	}])
})(angular)
