package com.climentos.climentos_backend;

public class LoginRequest {

private String email;
private String password;

public LoginRequest() {
}

// Get email
public String getEmail() {
    return email;
}

// Set email
public void setEmail(String email) {
    this.email = email;
}

// Get password
public String getPassword() {
    return password;
}

// Set password
public void setPassword(String password) {
    this.password = password;
}  

}