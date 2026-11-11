package com.climentos.climentos_backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {

    // PRIMARY KEY
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // USER NAME
    @Column(nullable = false)
    private String name;

    // EMAIL
    @Column(nullable = false, unique = true)
    private String email;

    // PASSWORD
    @Column(nullable = false)
    private String password;

    // PASSWORD RESET TOKEN
    private String resetToken;

    // PASSWORD RESET TOKEN EXPIRY
    private LocalDateTime resetTokenExpiry;


    // DEFAULT CONSTRUCTOR
    public User() {
    }


    // GETTERS AND SETTERS

    // GET ID
    public Long getId() {
        return id;
    }

    // SET ID
    public void setId(Long id) {
        this.id = id;
    }

    // GET NAME
    public String getName() {
        return name;
    }

    // SET NAME
    public void setName(String name) {
        this.name = name;
    }

    // GET EMAIL
    public String getEmail() {
        return email;
    }

    // SET EMAIL
    public void setEmail(String email) {
        this.email = email;
    }

    // GET PASSWORD
    public String getPassword() {
        return password;
    }

    // SET PASSWORD
    public void setPassword(String password) {
        this.password = password;
    }

    // GET RESET TOKEN
    public String getResetToken() {
        return resetToken;
    }

    // SET RESET TOKEN
    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    // GET RESET TOKEN EXPIRY
    public LocalDateTime getResetTokenExpiry() {
        return resetTokenExpiry;
    }

    // SET RESET TOKEN EXPIRY
    public void setResetTokenExpiry(LocalDateTime resetTokenExpiry) {
        this.resetTokenExpiry = resetTokenExpiry;
    }

}
