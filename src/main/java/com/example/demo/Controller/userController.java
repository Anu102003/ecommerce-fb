package com.example.demo.Controller;


import com.example.demo.DTO.*;
import com.example.demo.Service.UserService;
import com.example.demo.Model.login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin()
@RestController
@RequestMapping("api/")
public class userController {
    @Autowired
    private UserService userService;

@PostMapping("save")
    public ResponseEntity<?> userDetails (@RequestBody UserDto userDto){
        System.out.println("register");
       return userService.userSave(userDto);
    }
    @PostMapping("login")
    public LoginResponse login (@RequestBody login Login){
       return userService.authenticate(Login);
    }
    @RequestMapping(value="confirm-account", method= {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<?> confirmUserAccount(@RequestParam("token")String confirmationToken) {
        return userService.confirmEmail(confirmationToken);
    }
    @PostMapping("refreshToken")
    public ResponseEntity<LoginResponse> refresh(@RequestBody RefreshTokenDTO refreshTokenDTO){
    return ResponseEntity.ok(userService.refreshToken(refreshTokenDTO));
    }
    @PostMapping("forgetPassword")
    public Object forget(@RequestBody ForgetPasswordDTO forgetPasswordDTO){
       return  userService.forgotPassword(forgetPasswordDTO);
    }
    @PostMapping("resetPassword")
    public Object reset(@RequestBody ResetPasswordDTO resetPasswordDTO){
        return  userService.resetPassword(resetPasswordDTO);
    }


}
