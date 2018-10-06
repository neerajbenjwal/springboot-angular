package com.benjwal.app.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.benjwal.app.model.Task;
import com.benjwal.app.model.TaskVO;
import com.benjwal.app.repo.APIRepo;

@Service
public class APIServiceImpl implements APIService {

	@Autowired
	private APIRepo repo;

	@Override
	public TaskVO createTask(Task task) {
		TaskVO vo = new TaskVO();
		vo.setChange(getDate());
		vo.setCreation(getDate());
		int dl = (int) getDaysLeft(getDate(), task.getDueDate());
		vo.setDaysLeft(dl);
		vo.setDueDate(task.getDueDate());
		vo.setName(task.getName());
		vo.setPriority(task.getPriority());
		vo.setStatus("Pending");
		repo.save(vo);
		return vo;
	}

	private String getDate() {
		Date date = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
		String strDate = formatter.format(date);
		return strDate;
	}

	private long getDaysLeft(String inputString1, String inputString2) {
		SimpleDateFormat myFormat = new SimpleDateFormat("MM/dd/yyyy");
		try {
			Date date1 = myFormat.parse(inputString1);
			Date date2 = myFormat.parse(inputString2);
			long diff = date2.getTime() - date1.getTime();
			return TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public void deleteTask(int id) {
		repo.deleteById(id);

	}

	@Override
	public TaskVO updateTask(Task task, int id) {
		TaskVO existing = repo.findTaskVOById(id);
		existing.setName(task.getName());
		existing.setChange(getDate());
		existing.setDueDate(task.getDueDate());
		int dl = (int) getDaysLeft(getDate(), task.getDueDate());
		existing.setDaysLeft(dl);
		existing.setPriority(task.getPriority());
		existing.setStatus(task.getStatus());
		repo.save(existing);
		return existing;
	}

	@Override
	public List<TaskVO> getTaskList() {
		return repo.findAll();
	}

}
