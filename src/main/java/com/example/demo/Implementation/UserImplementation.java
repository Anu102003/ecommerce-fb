package com.example.demo.Implementation;

import com.example.demo.Config.jwtService;
import com.example.demo.DTO.*;
import com.example.demo.Model.*;
import com.example.demo.Repository.AddressRepository;
import com.example.demo.Repository.ConfirmationTokenRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Service.UserService;
import jakarta.transaction.Transactional;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Random;

@Service
@Builder
@Data
public class UserImplementation implements UserService {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AddressRepository addressRepository;
    PasswordEncoder passwordEncoder;
    @Autowired
    private jwtService JwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;
    @Autowired
    EmailService emailService;

    @Override
    @Transactional
    public ResponseEntity<?> userSave(UserDto userDto) {
        if (userRepository.existsByUserEmail(userDto.getUserEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");

        }
        Address newaddress = new Address();
        newaddress.setAddressOne(userDto.getAddressOne());
        newaddress.setAddressTwo(userDto.getAddressTwo());
        newaddress.setAddressThree(userDto.getAddressThree());
        newaddress.setCity(userDto.getCity());
        newaddress.setCountry(userDto.getCountry());
        newaddress.setState(userDto.getState());
        newaddress.setPinCode(userDto.getPinCode());
        addressRepository.save(newaddress);

        var userDetails = UserDetail.builder()
                .userName(userDto.getUserName())
                .userEmail(userDto.getUserEmail())
                .userMobileNumber(userDto.getUserMobileNumber())
                .role(Role.USER)
                .password(passwordEncoder.encode(userDto.getPassword()))
                .address(newaddress)
                .build();

       // var jwt = JwtService.generateToken(userDetails);

        ConfirmationToken confirmationToken = new ConfirmationToken(userDetails);
        confirmationTokenRepository.save(confirmationToken);
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(userDetails.getUserEmail());
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setText("To confirm your account, please click here : "
                + "http://localhost:8080/api/confirm-account?token=" + confirmationToken.getConfirmationToken());
        emailService.sendEmail(mailMessage);
        userRepository.save(userDetails);
        return ResponseEntity.ok("jwt");

    }
    @Override
    public ResponseEntity<?> confirmEmail(String confirmationToken) {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if (token != null) {
            System.out.println("email verifcation ");
            userRepository.save(token.getUser());
            return ResponseEntity.ok("Email verified successfully!");

        }
        return ResponseEntity.badRequest().body("Error: Couldn't verify email");
    }
    @Override
    public LoginResponse authenticate(login request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUserEmail(request.getEmail()).orElseThrow();
        var jwt = JwtService.generateToken(user);
        var refreshToken = JwtService.generateRefreshToken(new HashMap<>(), user);
        return LoginResponse.builder().token(jwt)
                .refreshToken(refreshToken).
                build();

    }

    @Override
    public LoginResponse refreshToken(RefreshTokenDTO refreshTokenDTO) {
        String userEmail = JwtService.extractUserName(refreshTokenDTO.getToken());
        UserDetail user = userRepository.findByUserEmail(userEmail).orElseThrow();
        if (JwtService.tokenValid(refreshTokenDTO.getToken(), user)) {
            var jwt = JwtService.generateToken(user);
            return LoginResponse.builder().token(jwt)
                    .refreshToken(refreshTokenDTO.getToken()).
                    build();
        }
        return null;
    }




    @Override
    public ResponseEntity<String> forgotPassword(ForgetPasswordDTO forgetPasswordDTO) {
        try {
            String email = forgetPasswordDTO.getEmail();
            UserDetail user = userRepository.findByUserEmail(email)
                    .orElseThrow();

            String resetCode=generateResetCode();
            user.setResetCode(resetCode);
            sendResetPasswordEmail(email, resetCode);
            userRepository.save(user);
            return ResponseEntity.ok("Verification code sent to your email.");
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing forgot password request.");
        }
    }

    @Override
    public ResponseEntity<String> resetPassword(ResetPasswordDTO resetPasswordDTO) {
        try {
            String email = resetPasswordDTO.getEmail();
            String code = resetPasswordDTO.getCode();
            String newPassword = resetPasswordDTO.getNewPassword();
            UserDetail user = userRepository.findByUserEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

            if (code.equals(user.getResetCode())) {
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(user);
                return ResponseEntity.ok("Password reset successful.");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid verification code.");
            }
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error resetting password.");
        }
    }


    private String generateResetCode() {
        Random random = new SecureRandom();
        int codeLength = 6;
        StringBuilder resetCode = new StringBuilder();
        for (int i = 0; i < codeLength; i++) {
            int digit = random.nextInt(10);
            resetCode.append(digit);
        }
        return resetCode.toString();
    }

    private void sendResetPasswordEmail(String email, String resetCode) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(email);
            mailMessage.setSubject("Reset Your Password");
            mailMessage.setText("Use the following code to reset your password: " + resetCode);
            emailService.sendEmail(mailMessage);
            System.out.println("Reset password email sent successfully.");
        } catch (Exception e) {

            System.err.println("Error sending reset password email.");
        }
    }
}




