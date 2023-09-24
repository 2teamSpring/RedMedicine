package com.example.redmedicine.service;

import com.example.redmedicine.domain.dto.CounselorDto;
import com.example.redmedicine.domain.vo.CounselorVo;
import com.example.redmedicine.mapper.CounselorMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CounselorService {
    private final CounselorMapper counselorMapper;//메퍼를 가지고 오겠다!

    //    추가
    public void register(CounselorDto counselorDto){
        counselorMapper.insert(counselorDto);
    }

    //    삭제
    public void remove(Long counselorNumber){
        if(counselorNumber == null){
            throw new IllegalArgumentException("상담 게시판 번호 누락!");
        }
        counselorMapper.delete(counselorNumber);
    }

    //    수정
    public void modify(CounselorDto counselorDto){
        counselorMapper.update(counselorDto);
    }

    //    조회
    public CounselorVo find(Long counselorNumber){
        if(counselorNumber == null){
            throw new IllegalArgumentException("상담 게시판 번호 누락!");
        }
        return Optional.ofNullable(counselorMapper.select(counselorNumber))
                .orElseThrow(()->{throw new IllegalArgumentException("존재하지 않는 게시판 번호");});
    }

    //    전체조회
    public List<CounselorVo> findAll(){
        return counselorMapper.selectAll();
    }
}
