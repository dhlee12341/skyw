package com.skyw.board.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.math.BigDecimal;
import org.apache.ibatis.type.Alias;
import lombok.Data;

@Alias("Grid")
@Data
public class Grid {
    private Integer id;
    private String name;
    private String email;
    private Integer iage;
    private LocalDateTime createdAt;
    private Boolean isActive;
    private BigDecimal balance;
    private String bio;
    private LocalDate birthDate;
    private String ipAddress;
}