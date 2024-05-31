package com.shoppingonline.be.controller;

import com.shoppingonline.be.dto.users.ChangePasswordUserDto;
import com.shoppingonline.be.dto.users.UpdateUserDto;
import com.shoppingonline.be.email.EmailRequest;
import com.shoppingonline.be.model.entities.Users;
import com.shoppingonline.be.model.enums.Gender;
import com.shoppingonline.be.service.interfaces.UserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user/account")
@RequiredArgsConstructor
public class UsersController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello from secured endpoint");
    }

    @PostMapping("/profile/update")
    public ResponseEntity<Users> updateUser(
            @RequestParam("name") String name,
            @RequestParam("numberPhone") String numberPhone,
            @RequestParam("avatarImg") MultipartFile avatarImg,
            @RequestParam("dateOfBirth") String dateOfBirth,
            @RequestParam("gender") Gender gender
            ) throws IOException {
        UpdateUserDto userDto = UpdateUserDto.builder()
                .avatarImg(avatarImg)
                .name(name)
                .numberPhone(numberPhone)
                .dateOfBirth(dateOfBirth)
                .gender(gender)
                .build();

        return ResponseEntity.ok(userService.updateUser(userDto));
    }

    @PostMapping("/password/forgotPassword")
    public String forgotPassword(@RequestBody EmailRequest emailRequest) throws MessagingException, UnsupportedEncodingException {
        if (userService.isEmail(emailRequest.getEmail())) {
            return "verifyEmail_success";
        } else {
            return "verifyEmail_fail";
        }
    }

    @PostMapping("/password/changePassword")
    public String changePassword(@RequestBody ChangePasswordUserDto userDto) {
        if (userService.changePassword(userDto)) {
            return "changePassword_success";
        } else {
            return "changePassword_fail";
        }
    }

    @GetMapping("/verify")
    public String verifyUser(@Param("code") String code) {
        if (userService.verity(code)) {
            return "verify_success";
        } else {
            return "verify_fail";
        }
    }

}
