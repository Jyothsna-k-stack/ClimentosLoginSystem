package com.climentos.climentos_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.climentos.climentos_backend.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
    //FIND USER BY PASSWORD RESET TOKEN
    User findByResetToken(String resetToken);

}