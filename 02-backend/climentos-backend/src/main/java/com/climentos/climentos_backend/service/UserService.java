package com.climentos.climentos_backend.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.climentos.climentos_backend.entity.User;
import com.climentos.climentos_backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JavaMailSender mailSender;

    // CONSTRUCTOR
    public UserService(UserRepository userRepository,
                       JavaMailSender mailSender) {

        this.userRepository = userRepository;
        this.mailSender = mailSender;
    }


    // ==========================================
    // 1. GET USER BY EMAIL
    // ==========================================

    public User getUserByEmail(String email) {

        return userRepository.findByEmail(email);
    }


    // ==========================================
    // 2. CHECK EMAIL
    // ==========================================

    public boolean emailExists(String email) {

        return userRepository.findByEmail(email) != null;
    }


    // ==========================================
    // 3. LOGIN
    // ==========================================

    public boolean login(String email, String password) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return false;
        }

        return user.getPassword().equals(password);
    }


    // ==========================================
    // 4. REGISTER NEW USER
    // ==========================================

    public boolean registerUser(User user) {

        if (userRepository.findByEmail(user.getEmail()) != null) {
            return false;
        }

        userRepository.save(user);

        return true;
    }


    // ==========================================
    // 5. FORGOT PASSWORD
    // ==========================================

    public boolean forgotPassword(String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return false;
        }

        // Generate unique reset token
        String token = UUID.randomUUID().toString();

        // Set token expiry to 15 minutes
        user.setResetToken(token);

        user.setResetTokenExpiry(
            LocalDateTime.now().plusMinutes(15)
        );

        // Save token in database
        userRepository.save(user);


        // Create password reset link
        String resetLink =
            "http://127.0.0.1:5500/01-frontend/index.html?token="
            + token;


        // Create email message
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

        // Send email
        mailSender.send(message);

        return true;
    }


    // ==========================================
    // 6. RESET PASSWORD
    // ==========================================

    public boolean resetPassword(String token,
                                 String newPassword) {

        // Find user using reset token
        User user = userRepository.findByResetToken(token);

        if (user == null) {
            return false;
        }

        // Check token expiry
        if (user.getResetTokenExpiry() == null ||
            user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {

            return false;
        }

        // Update password
        user.setPassword(newPassword);

        // Clear reset token
        user.setResetToken(null);

        user.setResetTokenExpiry(null);

        // Save updated user
        userRepository.save(user);

        return true;
    }

}