package com.tasktracker.tasktracker.task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // Additional query methods can be defined here if needed
    // For example, to find tasks by status or assigned user, you can add methods like:
 
}
