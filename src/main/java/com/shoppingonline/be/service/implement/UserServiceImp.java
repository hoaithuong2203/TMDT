package com.shoppingonline.be.service.implement;

import com.shoppingonline.be.dto.users.ChangePasswordUserDto;
import com.shoppingonline.be.dto.users.UpdateUserDto;
import com.shoppingonline.be.email.EmailService;
import com.shoppingonline.be.model.entities.Avatar;
import com.shoppingonline.be.model.entities.Users;
import com.shoppingonline.be.repository.AvatarRepository;
import com.shoppingonline.be.repository.UserRepository;
import com.shoppingonline.be.service.interfaces.UserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {
    @Value("${media.img_path}")
    private String uploadedFolder;
    private final UserRepository repository;
    private final AvatarRepository avatarRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Users updateUser(UpdateUserDto userDto) throws IOException {
        long avatarId = saveUploadedFiles(userDto.getAvatarImg());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Users user = repository.findByEmail(userDetails.getUsername());

            user.setName(userDto.getName());
            user.setNumberPhone(userDto.getNumberPhone());
            user.setAvatarId(avatarId);
            user.setDateOfBirth(userDto.getDateOfBirth());
            user.setGender(userDto.getGender());

            repository.save(user);
            return user;
        }
        return null;
    }

    @Override
    public Page<Users> getAllUsers(int pageNo, int pageSize) {
        return null;
    }

    @Override
    public Long saveUploadedFiles(MultipartFile file) throws IOException {
        File dir = new File(uploadedFolder);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        Random rand = new Random();
        int randNum = rand.nextInt();
        if (!file.isEmpty()) {
            byte[] bytes = file.getBytes();
            Path path = Paths.get(dir + "//" + file.getName() + randNum + getFileExtension(file.getOriginalFilename()));
            Files.write(path, bytes);
            Avatar avatar = new Avatar();
            avatar.setName(path.getFileName().toString());
            avatar = avatarRepository.save(avatar);
            return avatar.getId();
        }
        return null;
    }

    @Override
    public List<Users> searchProduct(String keyword, Long categoryId) {
        return null;
    }

    @Override
    public boolean verity(String verificationCode) {
        Users user = repository.findByVerificationCode(verificationCode);

        if (user == null || user.isEnabled()) {
            return false;
        } else {
            user.setVerificationCode(null);
            user.setEnabled(true);
            repository.save(user);

            return true;
        }
    }

    @Override
    public boolean isEmail(String email) throws UnsupportedEncodingException, MessagingException {
        Users user = repository.findByEmail(email);

        if (user == null || !user.isEnabled()) {
            return false;
        } else {
            user.setVerificationCode(emailService.generateVerificationCode());
            repository.save(user);
            emailService.sendVerificationEmailForgot(user);
            return true;
        }
    }


    // Chưaổn
    @Override
    public boolean changePassword(ChangePasswordUserDto userDto) {
        Users user = repository.findByVerificationCode(userDto.getVerificationCode());

        if (user == null || !user.isEnabled()) {
            return false;
        } else {
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            repository.save(user);
            return true;
        }
    }

    public String getFileExtension(String fileName){
        return "." + FilenameUtils.getExtension(fileName);
    }
}
