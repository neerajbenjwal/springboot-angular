package com.benjwal.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.benjwal.app.model.Task;
import com.benjwal.app.model.TaskVO;
import com.benjwal.app.service.APIService;

@RestController
public class APIController {

	@Autowired
	private APIService service;

	@RequestMapping(value = "/api/task", method = RequestMethod.POST)
	public TaskVO createTask(@RequestBody Task task) {
		return service.createTask(task);
	}

	@RequestMapping(value = "/api/task/{id}", method = RequestMethod.DELETE)
	public void deleteTask(@PathVariable("id") int id) {
		service.deleteTask(id);
	}

	@RequestMapping(value = "/api/task/{id}", method = RequestMethod.PUT)
	public TaskVO updateTask(@RequestBody Task task, @PathVariable("id") int id) {
		return service.updateTask(task, id);
	}

	@RequestMapping(value = "/api/task", method = RequestMethod.GET)
	public List<TaskVO> getTaskList() {
		return service.getTaskList();
	}

}
