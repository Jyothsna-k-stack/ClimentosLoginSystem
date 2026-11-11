package com.climentos.climentos_backend.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.climentos.climentos_backend.LoginRequest;
import com.climentos.climentos_backend.entity.User;
import com.climentos.climentos_backend.service.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // CHECK EMAIL
    @GetMapping("/check-email")
    public boolean checkEmail(@RequestParam String email) {
        return userService.emailExists(email);
    }

    // LOGIN API
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {

        boolean result = userService.login(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        if (result) {
            return "Login successful";
        }

        return "Invalid email or password";
    }

    // REGISTER API
    @PostMapping("/register")
    public String register(@RequestBody User user) {

        boolean result = userService.registerUser(user);

        if (result) {
            return "Registration successful";
        }

        return "Email already exists";
    }

    // FORGOT PASSWORD API
    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody Map<String, String> request) {

        String email = request.get("email");

        if (email == null || email.isBlank()) {
            return "Email is required";
        }

        boolean result = userService.forgotPassword(email);

        if (result) {
            return "Password reset link sent to your email";
        }

        return "Email not found";
    }

    // RESET PASSWORD API
    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody Map<String, String> request) {

        String token = request.get("token");
        String newPassword = request.get("newPassword");

        if (token == null || token.isBlank()
                || newPassword == null || newPassword.length() < 8) {
            return "Valid token and password of at least 8 characters are required";
        }

        boolean result = userService.resetPassword(token, newPassword);

        if (result) {
            return "Password reset successful";
        }

        return "Invalid or expired reset link";
    }
}