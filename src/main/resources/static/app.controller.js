var app = angular.module("Emirates");

app.controller("appController", AppController);

function AppController(appService) {

	var self = this;

	this.default_priority = "Low";

	this.default_status = "Pending";

	this.priority = [ "High", "Medium", "Low" ];

	this.status = [ "Pending", "Complete" ];

	this.tc_priority = this.default_priority;

	this.tc_status = this.default_status;

	this.taskData = [];

	appService.getTaskList().then(function(data) {
		debugger;
		for (var i = 0; i < data.length; i++) {
			var temp = data[i];
			self.taskData.push(temp);
		}

	});

	// ********************Create********************/
	this.selectPriority = function(p) {
		this.tc_priority = p;
	}
	this.selectStatus = function(s) {
		this.tc_status = s;
	}

	// show create task.
	this.showCreateTask = function() {
		this.tc_name = "";
		this.tc_priority = this.default_priority;
		this.tc_date = "";
		$('#createModel').modal('show');
	}
	// HTTP create task.
	this.createTask = function() {
		var date = new Date(this.tc_date);
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		if (day < 10) {
			day = '0' + day;
		}
		if (month < 10) {
			month = '0' + month;
		}
		var formattedDate = month + '/' + day + '/' + year

		var task = {
			"name" : this.tc_name,
			"priority" : this.tc_priority,
			"dueDate" : formattedDate
		}
		if (task.name && task.priority && task.dueDate) {
			appService.addTask(task).then(function(data) {
			/*	var data = {
					"id" : data.id,
					"name" : data.name,
					"priority" : data.priority,
					"dueDate" : data.dueDate,
					"daysLeft" : data.daysLeft,
					"status" : data.status,
					"creation" : data.creation,
					"change" : data.change,
				};*/
				self.taskData.push(data);
				this.tc_name = "";
				this.tc_priority = this.default_priority;
				this.tc_date = "";
			});
		} else {
			alert("All fields are mandatory");
		}

	}

	// ********************Update********************/
	this.editObject = {};
	// show update task.
	this.showEditTask = function(id) {
		for (var i = 0; i < this.taskData.length; i++) {
			var temp = this.taskData[i];
			if (temp.id === id) {
				this.editObject = {
					"id" : temp.id,
					"name" : temp.name,
					"priority" : temp.priority,
					"dueDate" : new Date(temp.dueDate),
					"daysLeft" : temp.daysLeft,
					"status" : temp.status,
					"creation" : new Date(temp.creation),
					"change" : new Date(temp.change)
				}
			}
		}
		$('#updateModel').modal('show');
	}

	this.updatePriority = function(p) {
		this.editObject.priority = p;
	}
	this.updateStatus = function(s) {
		this.editObject.status = s;
	}
	// HTTP update task.
	this.updateTask = function() {
		var date = new Date(self.editObject.dueDate);
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		if (day < 10) {
			day = '0' + day;
		}
		if (month < 10) {
			month = '0' + month;
		}
		var formattedDate = month + '/' + day + '/' + year

		var task = {
			"name" : self.editObject.name,
			"priority" : self.editObject.priority,
			"dueDate" : formattedDate,
			"status" : self.editObject.status
		}
		if (task.name && task.priority && task.dueDate && task.status) {
			appService.updateTask(task, self.editObject.id).then(
					function(data) {
					/*	var data = {
							"id" : data.id,
							"name" : data.name,
							"priority" : data.priority,
							"dueDate" : data.dueDate,
							"daysLeft" : data.daysLeft,
							"status" : data.status,
							"creation" : data.creation,
							"change" : data.change,
						};*/
						for (var i = 0; i < self.taskData.length; i++) {
							var temp = self.taskData[i];
							if (temp.id === data.id) {
								self.taskData.splice(i, 1);
								self.taskData.push(data);
							}
						}
					});
			self.editObject = {};
		} else {
			alert("All fields are mandatory");
		}
	}
	// ********************Delete********************/
	this.deleteId = "";
	// show delete task.
	this.showDeleteTask = function(id) {
		self.deleteId = id;
		$('#deleteModel').modal('show');
	}

	// HTTP delete task.
	this.deleteTask = function() {
		if (self.deleteId) {
			appService.deleteTask(this.deleteId).then(function(data) {
				debugger;
				for (var i = 0; i < self.taskData.length; i++) {
					var temp = self.taskData[i];
					if (temp.id === self.deleteId) {
						self.taskData.splice(i, 1);
						this.deleteId = "";
					}
				}
			});
		}

	}
}
