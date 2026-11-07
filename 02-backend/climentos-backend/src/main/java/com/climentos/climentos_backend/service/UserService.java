package com.climentos.climentos_backend.service;

import org.springframework.stereotype.Service;

import com.climentos.climentos_backend.entity.User;
import com.climentos.climentos_backend.repository.UserRepository;

@Service
public class UserService {

private final UserRepository userRepository;

public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
}

// GET USER BY EMAIL
public User getUserByEmail(String email) {

    return userRepository.findByEmail(email);
}

// CHECK EMAIL
public boolean emailExists(String email) {

    return userRepository.findByEmail(email) != null;
}

// CHECK EMAIL AND PASSWORD
public boolean login(String email, String password) {

    User user = userRepository.findByEmail(email);

    if (user == null) {
        return false;
    }

    return user.getPassword().equals(password);
}

}