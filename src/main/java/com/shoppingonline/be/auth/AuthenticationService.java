package com.shoppingonline.be.auth;

import com.shoppingonline.be.config.JwtService;
import com.shoppingonline.be.email.EmailService;
import com.shoppingonline.be.model.entities.Users;
import com.shoppingonline.be.model.enums.Role;
import com.shoppingonline.be.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthenticationResponse register(RegisterRequest request, String siteUrl) throws MessagingException, UnsupportedEncodingException {
        Users u = repository.findByEmail(request.getEmail());
        if (u == null) {
            var user = Users.builder()
                    .name(request.getName())
                    .createBy(LocalDateTime.now())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .verificationCode(emailService.generateVerificationCode())
                    .enabled(false)
                    .role(Role.CUSTOMER)
                    .build();
            repository.save(user);

            emailService.sendVerificationEmail(user, siteUrl);
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .statusCode(HttpStatus.CREATED.value())
                    .message("Register Success")
                    .email(request.getEmail())
                    .build();
        }
        return AuthenticationResponse.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message("Email is Exist")
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail());
        if (user.isEnabled()){
            Map<String, Object> extractClaims = new HashMap<>();
            extractClaims.put("id", user.getId());
            extractClaims.put("role", user.getRole());
            var jwtToken = jwtService.generateToken(extractClaims, user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .statusCode(HttpStatus.CREATED.value())
                    .message("Login Success")
                    .email(request.getEmail())
                    .build();
        }
        return AuthenticationResponse.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message("Chưa xác thực tài khoản, vui lòng vào Email: " + user.getEmail() + " để xác thực")
                .build();
    }

}
