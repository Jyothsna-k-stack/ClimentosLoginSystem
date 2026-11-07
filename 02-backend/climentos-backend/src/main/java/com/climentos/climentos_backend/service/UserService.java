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

    public User getUserByEmail(String email) {

        return userRepository.findByEmail(email);

    }
    public boolean emailExists(String email){
        return 
        userRepository.findByEmail(email)!=null;
    }

}
