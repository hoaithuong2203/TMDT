package com.shoppingonline.be.service.interfaces;

import com.shoppingonline.be.dto.users.ChangePasswordUserDto;
import com.shoppingonline.be.dto.users.UpdateUserDto;
import com.shoppingonline.be.model.entities.Users;
import jakarta.mail.MessagingException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@Service
public interface UserService {
    Users updateUser(UpdateUserDto user) throws IOException;

    Page<Users> getAllUsers(int pageNo, int pageSize);

    Long saveUploadedFiles(MultipartFile file) throws IOException;

    List<Users> searchProduct(String keyword, Long categoryId);

    boolean verity(String verificationCode);

    boolean isEmail(String email) throws MessagingException, UnsupportedEncodingException;

    boolean changePassword(ChangePasswordUserDto userDto);
}
