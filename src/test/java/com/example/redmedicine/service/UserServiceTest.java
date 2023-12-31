package com.example.redmedicine.service;

import com.example.redmedicine.domain.dto.UserDto;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Slf4j
@Transactional
class UserServiceTest {
    @Autowired
    UserService userService;

    UserDto userDto;

    @BeforeEach
    void setUp(){
        userDto = new UserDto();
        userDto.setUserId("testId");
        userDto.setUserPassword("1234");
        userDto.setUserName("태스트");
        userDto.setUserEmail("aaa@naver.com");
        userDto.setUserPhone("010-1234-5678");
        userDto.setUserBirth("2023-09-18");
        userDto.setUserGender("M");
        userDto.setUserLevel(1L);

    }

    @Test
    void registerAndFindUserNumber() {
        //등록 후 회원번호 찾기 테스트를 진행하겠다
        userService.register(userDto);

        Long foundNumber = userService.findUserNumber(userDto.getUserId(),userDto.getUserPassword());
        //userService.findUserNumber(userDto.getUserId(), userDto.getUserPassword())에 이미 정보가 있는 상태

        assertThat(foundNumber).isEqualTo(userDto.getUserNumber());
    }
}