package com.shoppingonline.be.repository;

import com.shoppingonline.be.model.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {

    public Users findByEmail(String email);
    @Query("SELECT u FROM Users u WHERE u.verificationCode = ?1")
    public Users findByVerificationCode(String code);
    @Query("SELECT u FROM Users u WHERE u.email =?1")
    public boolean isEmail(String email);

}
