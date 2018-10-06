(function() {
	var app = angular.module("Emirates");

	app.service("appService", function($location, $http) {

		var url = $location.absUrl() + "api/task";

		var config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		}

		// add new task.
		this.addTask = function(task) {
			var promise1 = $http.post(url, task, config);
			var promise2 = promise1.then(function(response) {
				return response.data;
			}, function errorCallback(response) {
				alert(response.data.errorMessage);
			});
			return promise2;
		}

		// delete task.
		this.deleteTask = function(id) {
			var promise1 = $http.delete(url+"/"+id, config);
			var promise2 = promise1.then(function(response) {
				return response.data;
			}, function errorCallback(response) {
				alert(response.data.errorMessage);
			});
			return promise2;
		}
		
		// update task.
		this.updateTask = function(task,id) {
			var promise1 = $http.put(url+"/"+id, task, config);
			var promise2 = promise1.then(function(response) {
				return response.data;
			}, function errorCallback(response) {
				alert(response.data.errorMessage);
			});
			return promise2;
		}
		// get all task.
		this.getTaskList = function(){
			var promise1 = $http.get(url, config);
			var promise2 = promise1.then(function(response) {
				return response.data;
			}, function errorCallback(response) {
				alert(response.data.errorMessage);
			});
			return promise2;
		}

	});

})();