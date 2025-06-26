package com.tasktracker.tasktracker.task;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import com.tasktracker.tasktracker.user.UserRepository;
import com.tasktracker.tasktracker.user.User;


@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private UserRepository userRepository;
    public List<Task> getAllTasks() {
        return taskRepository.findAll();        
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id).orElse(null); 
    }
    public Task createTask(Task task) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        task.setCreatedBy(user);
        // task.setAssignedTo(user.getId()); /
        taskRepository.save(task);
        return task; 
    }
    public Task updateTask(Long id, Task task) {
        Task existingTask = taskRepository.findById(id).orElse(null);
        if (existingTask != null) {
            existingTask.setTitle(task.getTitle());
            existingTask.setDescription(task.getDescription());
            existingTask.setPriority(task.getPriority());
            existingTask.setStatus(task.getStatus());
            existingTask.setCategory(task.getCategory());
            existingTask.setCreatedBy(task.getCreatedBy());
            existingTask.setAssignedTo(task.getAssignedTo());       
            // Update other fields as necessary
            taskRepository.save(existingTask);
        } else {
            throw new RuntimeException("Task not found");
        }
        return task; 
    }
    public void deleteTask(Long id) {
       taskRepository.deleteById(id);
    }

    public List<Task> getTasksByUserId(Long userId) {
        
        return List.of(); 
    }
    public List<Task> getTasksByStatus(String status) {
        
        return List.of(); 
    }
    public List<Task> getTasksByAssignedTo(Long assignedToId) {
        
        return List.of(); 
    }
    public List<Task> getTasksByCreatedBy(Long createdById) {
        
        return List.of(); 
    }
    public List<Task> getTasksByTitle(String title) {
        
        return List.of(); 
    }
}
