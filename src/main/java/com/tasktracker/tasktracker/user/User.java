package com.tasktracker.tasktracker.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;
import jakarta.persistence.Column;


@Data
@Entity
public class User {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;
@Column(name="username",unique = true)
private String username;
@Column(name="email",unique = true, nullable = false)
private String email;
public String phone;
private String name;
private Role role;
private String password;

}

