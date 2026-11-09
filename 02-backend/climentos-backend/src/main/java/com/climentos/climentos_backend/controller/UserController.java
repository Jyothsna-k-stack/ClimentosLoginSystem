package com.climentos.climentos_backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.climentos.climentos_backend.LoginRequest;
import com.climentos.climentos_backend.service.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UserController {

private final UserService userService;

public UserController(UserService userService) {
    this.userService = userService;
}



//  CHECK EMAIL


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


    // LOGIN SUCCESS

    if (result) {

        return "Login successful";

    }


    // LOGIN FAILURE

    return "Invalid email or password";

}

}