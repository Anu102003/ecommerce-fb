package com.example.demo.Service;

import com.example.demo.DTO.*;
import com.example.demo.Model.login;
import org.springframework.http.ResponseEntity;

public interface UserService {

    ResponseEntity<?> userSave(UserDto userDto);
   LoginResponse authenticate(login loginDetails);


    ResponseEntity<?> confirmEmail(String confirmationToken);
    LoginResponse refreshToken(RefreshTokenDTO refreshTokenDTO);

    ResponseEntity<String> forgotPassword(ForgetPasswordDTO forgetPasswordDTO);

    ResponseEntity<String> resetPassword(ResetPasswordDTO resetPasswordDTO);
}

