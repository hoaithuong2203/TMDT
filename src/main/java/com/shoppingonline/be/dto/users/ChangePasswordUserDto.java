package com.shoppingonline.be.dto.users;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordUserDto {
    private String verificationCode;
    private String password;
    private String rePassword;
}
