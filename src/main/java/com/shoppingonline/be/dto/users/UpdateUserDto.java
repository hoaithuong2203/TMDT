package com.shoppingonline.be.dto.users;

import com.shoppingonline.be.model.enums.Gender;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserDto {
    private String name;
    private String numberPhone;
    private MultipartFile avatarImg;
    private String dateOfBirth;
    @Enumerated(EnumType.STRING)
    private Gender gender;
}
