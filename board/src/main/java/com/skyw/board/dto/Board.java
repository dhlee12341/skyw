package com.skyw.board.dto;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Alias("Board")
@Data
public class Board {
    private String 사용자ID;
    private String 비밀번호;
    private String 최종접속일시;
    private String 사용여부;
    private Date 입력일;
    private double 숫자형;
}
