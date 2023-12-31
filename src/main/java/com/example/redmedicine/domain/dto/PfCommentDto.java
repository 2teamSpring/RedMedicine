package com.example.redmedicine.domain.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class PfCommentDto {
    private Long pfCommentNumber;
    private Long profileNumber;
    private Long userNumber;
    private Long pfFileNumber;
    private String pfCommentContent;
    private String pfCommentDate;

}
