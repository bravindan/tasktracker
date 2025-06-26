package com.tasktracker.tasktracker.task;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.http.HttpStatus;

import java.util.List;


@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {
@Autowired
private TaskService taskService;
  
@GetMapping("")
public ResponseEntity<List<Task>> getAllTasks() {
    List<Task> tasks = taskService.getAllTasks();
    if (tasks == null || tasks.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(List.of());
    } else {
        return ResponseEntity.ok(tasks);
    }
}

@GetMapping("/{id}")
public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
    Task task = taskService.getTaskById(id);
    if (task != null) {
        return ResponseEntity.ok(task);
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }   

    }

@PostMapping("")
public ResponseEntity<Task> createTask(@RequestBody Task task) {
    Task createdTask = taskService.createTask(task);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
}

@PutMapping("/{id}")
public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody  Task task) {
    Task updatedTask = taskService.updateTask(id, task);
    if (updatedTask != null) {
        return ResponseEntity.ok(updatedTask);
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
    taskService.deleteTask(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
}

@GetMapping("/user/{userId}")
public ResponseEntity<List<Task>> getTasksByUserId(@PathVariable Long userId) {
    List<Task> tasks = taskService.getTasksByUserId(userId);
    if (tasks == null || tasks.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(List.of());
    } else {
        return ResponseEntity.ok(tasks);
    }
    }
}
