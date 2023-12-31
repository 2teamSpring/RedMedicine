package com.example.redmedicine.mapper;

import com.example.redmedicine.domain.dto.CCommentDto;
import com.example.redmedicine.domain.dto.CounselorDto;
import com.example.redmedicine.domain.dto.DiaryDto;
import com.example.redmedicine.domain.vo.Criteria;
import com.example.redmedicine.domain.vo.DiaryVo;
import com.example.redmedicine.domain.vo.MyDaybookVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface MyDaybookMapper {
//    다이어리 조회
    public List<DiaryDto> selectDiary(@Param("criteria") Criteria criteria, @Param("userNumber") Long userNumber);

//    상담게시글 조회
    public List<MyDaybookVo> selectCounselor(@Param("criteria") Criteria criteria, @Param("userNumber") Long userNumber);

//    다이어리 전체글 갯수 조회
    public int countDiary(Long userNumber);
//    상담록 전체글 갯수 조회
    public int countCounselor(Long userNumber);

}
