package com.benjwal.app.repo;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.benjwal.app.model.TaskVO;

public interface APIRepo extends JpaRepository<TaskVO, String> {
	@Transactional
	void deleteById(int id);

	TaskVO findTaskVOById(int id);
}
