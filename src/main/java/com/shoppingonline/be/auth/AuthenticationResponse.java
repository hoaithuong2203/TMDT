package com.shoppingonline.be.auth;

import lombok.*;

@Getter
@Builder
public class AuthenticationResponse {

    private String token;
    private int statusCode;
    private String email;
    private String message;

}
