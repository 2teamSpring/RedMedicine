package com.example.redmedicine.mapper;

import com.example.redmedicine.domain.dto.UserDto;
import com.example.redmedicine.domain.vo.UserVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    //회원 정보 삽입
    public void insert(UserDto userDto);

    //회원 번호 조회 -> 입력받은 ID와 PW를 이용해서 userNumber를 가져오겠다?
    public Long selectUserNumber(@Param("userId") String userId, @Param("userPassword") String userPassword);

    //회원 번호 조회 -> 회원 정보 수정 페이지 진입 전 비밀번호 확인!
    public String selectPasswordByUserNumber(Long userNumber);

    //회원 번호 조회 -> 회원 정보 수정 페이지 진입 전 회원아이디 확인!
    public long selectUserNumberById(String userId);

    //회원 정보 조회
    public UserDto selectAll();

    //유저 이름 찾기
    public String selectUserName(Long userNumber);

    //유저 레벨 찾기
    public Long selectUserLevel(Long userNumber);

    //조회
    public UserDto select(Long userNumber);

    //회원 정보 수정 - update
    public void update(UserDto userDto);

    //비밀번호 변경
    public void updatePw(String userName, String userPhone, String newPassword);

    //아이디 찾기
    public String selectUserId(@Param("userName") String userName, @Param("userPhone") String userPhone);
    //파라미터가 여러개 일 때는 @Param 이라는 어노테이션을 붙여줘야 확실하게 처리 된다.

    //아이디 중복 검사
    public int selectId(String userId);

    //결제->유료상담사 전환
    public void updateLv(Long userNumber);

    //회원 휴대폰 번호 조회
    public String selectUserPhoneNumber(Long userNumber);

    //    삭제
    public void delete(Long userNumber);
}
