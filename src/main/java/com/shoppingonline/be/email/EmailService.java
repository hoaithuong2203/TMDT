package com.shoppingonline.be.email;

import com.shoppingonline.be.model.entities.Users;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Random;

@Service
@Getter
@Setter
@RequiredArgsConstructor
public class EmailService {
    @Value("${spring.mail.username}")
    private String emailAddress;
    private final JavaMailSender mailSender;

    public void sendVerificationEmail(Users user, String siteURL)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail().trim();
        String fromAddress = emailAddress;
        String senderName = "Shopping Online 65CS1";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Shopping Online 65CS1.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getName());
        String verifyURL = siteURL + "/api/v1/user/account/verify?code=" + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);

    }

    public void sendVerificationEmailForgot(Users user)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail().trim();
        String fromAddress = emailAddress;
        String senderName = "Shopping Online 65CS1";
        String subject = "Forgot Password";
        String content = "Dear [[name]],<br>"
                + "CODE: [[code]]<br>"
                + "Thank you,<br>"
                + "Shopping Online 65CS1.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getName());
        content = content.replace("[[code]]", user.getVerificationCode());

        helper.setText(content, true);

        mailSender.send(message);

    }

    public String generateVerificationCode() {
        // Danh sách các ký tự mà bạn muốn sử dụng trong đoạn mã
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        // Tạo đối tượng Random
        Random random = new Random();
        // Thiết lập độ dài đoạn mã
        int length = 8;
        StringBuilder code = new StringBuilder();
        for (int i = 0; i < length; i++) {
            // Chọn một ký tự ngẫu nhiên từ danh sách
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);

            // Thêm ký tự vào đoạn mã
            code.append(randomChar);
        }

        return code.toString();
    }
}
