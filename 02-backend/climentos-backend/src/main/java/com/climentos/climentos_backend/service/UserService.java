package com.climentos.climentos_backend.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.climentos.climentos_backend.entity.User;
import com.climentos.climentos_backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JavaMailSender mailSender;
    private final PasswordEncoder passwordEncoder;

    // CONSTRUCTOR
    public UserService(UserRepository userRepository,
                       JavaMailSender mailSender,
                       PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.mailSender = mailSender;
        this.passwordEncoder = passwordEncoder;
    }

    // 1. GET USER BY EMAIL
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // 2. CHECK EMAIL
    public boolean emailExists(String email) {
        return userRepository.findByEmail(email) != null;
    }

    // 3. LOGIN
    public boolean login(String email, String password) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return false;
        }

        String storedPassword = user.getPassword();

        // Check whether the stored password is already BCrypt
        if (storedPassword.startsWith("$2a$")
                || storedPassword.startsWith("$2b$")
                || storedPassword.startsWith("$2y$")) {

            return passwordEncoder.matches(
                password, storedPassword
            );
        }

        // Support existing plain-text passwords once
        if (storedPassword.equals(password)) {

            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);

            return true;
        }

        return false;
    }

    // 4. REGISTER NEW USER
    public boolean registerUser(User user) {

        if (userRepository.findByEmail(user.getEmail()) != null) {
            return false;
        }

        // Hash password before saving
        user.setPassword(
            passwordEncoder.encode(user.getPassword())
        );

        userRepository.save(user);

        return true;
    }

    // 5. FORGOT PASSWORD
    public boolean forgotPassword(String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return false;
        }

        String token = UUID.randomUUID().toString();

        user.setResetToken(token);

        user.setResetTokenExpiry(
            LocalDateTime.now().plusMinutes(15)
        );

        userRepository.save(user);

        String resetLink =
            "http://127.0.0.1:5500/01-frontend/index.html?token="
            + token;

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(user.getEmail());

        message.setSubject("Climentos - Password Reset");

        message.setText(
            "Hello " + user.getName() + ",\n\n"
            + "We received a request to reset your password.\n\n"
            + "Click the link below to reset your password:\n\n"
            + resetLink + "\n\n"
            + "This link expires in 15 minutes.\n\n"
            + "If you did not request this, please ignore this email.\n\n"
            + "Regards,\n"
            + "Climentos Team"
        );

        mailSender.send(message);

        return true;
    }

    // 6. RESET PASSWORD
    public boolean resetPassword(String token,
                                 String newPassword) {

        User user = userRepository.findByResetToken(token);

        if (user == null) {
            return false;
        }

        if (user.getResetTokenExpiry() == null ||
            user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {

            return false;
        }

        // Hash new password before saving
        user.setPassword(
            passwordEncoder.encode(newPassword)
        );

        user.setResetToken(null);

        user.setResetTokenExpiry(null);

        userRepository.save(user);

        return true;
    }
}