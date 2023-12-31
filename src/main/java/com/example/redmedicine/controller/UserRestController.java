package com.example.redmedicine.controller;

//import com.example.redmedicine.service.SmsService;
import com.example.redmedicine.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
//import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/users/*")
@RequiredArgsConstructor
public class UserRestController {
    private final UserService userService;
//    private final SmsService smsService;

    @GetMapping("/findId")
    public String findId(String userName,String userPhone){
        String resultText = userService.findId(userName,userPhone);
        return resultText;
    }

    @PostMapping("/changePw")
    public void modifyPw(HttpServletRequest req, @RequestBody Map<String, String> param){
        String userName = (String) req.getSession().getAttribute("userName");
        String userPhone = (String) req.getSession().getAttribute("userPhone");
        String newPassword = param.get("newPassword");
        userService.modifyPw(userName, userPhone, newPassword);
    }

    @GetMapping("/check")//아이디만 중복 체크
    public int checkId(String userId){
        return userService.checkId(userId);
    }

    @GetMapping("/checkPw") //회원정보수정 페이지 진입 전 비밀번호 확인
    public String checkPw(HttpServletRequest req){
        Long userNumber = (Long)req.getSession().getAttribute("userNumber");
        String userPassword =userService.findPasswordByUserNumber(userNumber);

        return userPassword;
    }

}
