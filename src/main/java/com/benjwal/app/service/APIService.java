package com.benjwal.app.service;

import java.util.List;

import com.benjwal.app.model.Task;
import com.benjwal.app.model.TaskVO;

public interface APIService {
	public TaskVO createTask(Task task);

	public void deleteTask(int id);

	public TaskVO updateTask(Task task, int id);

	public List<TaskVO> getTaskList();
}
