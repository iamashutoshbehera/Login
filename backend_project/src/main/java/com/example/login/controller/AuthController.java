package com.example.login.controller;

import com.example.login.entity.User;
import com.example.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest,
                                      BindingResult bindingResult) {
        Map<String, Object> response = new HashMap<>();

        // Check for validation errors
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            response.put("success", false);
            response.put("message", "Validation failed");
            response.put("errors", errors);
            return ResponseEntity.badRequest().body(response);
        }

        // Check if passwords match
        if (!registerRequest.getPassword().equals(registerRequest.getConfirmPassword())) {
            response.put("success", false);
            response.put("message", "Passwords do not match!");
            return ResponseEntity.badRequest().body(response);
        }

        // Check if email already exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            response.put("success", false);
            response.put("message", "Email is already in use!");
            return ResponseEntity.badRequest().body(response);
        }

        // Create new user
        User user = new User();
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        User savedUser = userRepository.save(user);

        response.put("success", true);
        response.put("message", "User registered successfully!");
        response.put("user", Map.of(
                "id", savedUser.getId(),
                "firstName", savedUser.getFirstName(),
                "lastName", savedUser.getLastName(),
                "email", savedUser.getEmail(),
                "fullName", savedUser.getFullName()
        ));

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();

        // Find user by email (since we removed username)
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());

        if (userOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "Invalid email or password!");
            return ResponseEntity.badRequest().body(response);
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            response.put("success", false);
            response.put("message", "Invalid email or password!");
            return ResponseEntity.badRequest().body(response);
        }

        response.put("success", true);
        response.put("message", "Login successful!");
        response.put("user", Map.of(
                "id", user.getId(),
                "firstName", user.getFirstName(),
                "lastName", user.getLastName(),
                "email", user.getEmail(),
                "fullName", user.getFullName()
        ));

        return ResponseEntity.ok(response);
    }

    // Request DTOs
    public static class RegisterRequest {
        @NotBlank(message = "First name is required")
        @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
        private String firstName;

        @NotBlank(message = "Last name is required")
        @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
        private String lastName;

        @NotBlank(message = "Email is required")
        @Email(message = "Email should be valid")
        private String email;

        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String password;

        @NotBlank(message = "Confirm password is required")
        private String confirmPassword;

        // Getters and Setters
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }

        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public String getConfirmPassword() { return confirmPassword; }
        public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }
    }

    public static class LoginRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Email should be valid")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;

        // Getters and Setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}