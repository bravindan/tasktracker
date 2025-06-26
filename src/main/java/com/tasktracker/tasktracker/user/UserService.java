package com.tasktracker.tasktracker.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {

@Autowired
private UserRepository userRepository;
@Autowired
private PasswordEncoder passwordEncoder;

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encode the password before saving
        return userRepository.save(user);
        }

    public List<User> getAllUsers() {   
        return userRepository.findAll(); // Return all users from the repository
    }
    public Optional<User> getUserById(int id) {
        // This method can be implemented to return a user by ID
        return userRepository.findById(id); // Placeholder return statement
    }
    public User updateUser(int id, User user) {
        Optional<User> existingUserOpt = userRepository.findById(id);
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            existingUser.setPhone(user.getPhone());
            existingUser.setUsername(user.getUsername());
            existingUser.setRole(user.getRole());
            existingUser.setPassword(passwordEncoder.encode(user.getPassword())); // Encode the password before saving
            // Set other fields as needed
            return userRepository.save(existingUser);
        }
        throw new RuntimeException("User not found");
    }
    public void deleteUser(int id) {
        
        userRepository.deleteById(id);
    }
    
  
    

}
