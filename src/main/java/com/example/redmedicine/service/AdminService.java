package com.example.redmedicine.service;

import com.example.redmedicine.domain.dto.UserDto;
import com.example.redmedicine.domain.vo.Criteria;
import com.example.redmedicine.domain.vo.SearchVo;
import com.example.redmedicine.mapper.AdminMapper;
import com.example.redmedicine.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminService {
    private final AdminMapper adminMapper;
    private final UserDto userDto;

//    조회
    public UserDto find(Long userNumber){
        if (userNumber == null) {
            throw new IllegalArgumentException("유저 번호 누락!");
        }
        return Optional.ofNullable(adminMapper.select(userNumber))
                .orElseThrow(()-> {throw new IllegalArgumentException("존재하지않는 회원번호!");
                });
    }

//    전체회원 조회
    public List<UserDto> findAll(Criteria criteria, SearchVo searchVo){
        return adminMapper.selectAll(criteria, searchVo);
    }

//    전체 회원 수 조회
    public int getTotal(){
        return adminMapper.selectTotal();
    }

//    검색 결과 회원 수 조회
    public int searchTotal(SearchVo searchVo){
        return adminMapper.searchTotal(searchVo);
    }

//    회원 삭제
    public void remove(Long userNumber){
        if (userNumber == null){
            throw new IllegalArgumentException("유저 넘버 누락!!");
        }
        adminMapper.delete(userNumber);
    }
}
