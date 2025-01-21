package com.skyw.board.controller;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skyw.board.dto.Board;
import com.skyw.board.dto.Grid;
import com.skyw.board.service.BoardService;

import lombok.extern.slf4j.Slf4j;

@Slf4j // 로그 사용 어노테이션
@CrossOrigin(origins = "http://localhost:8080")  // 포트 변경
@RestController // JSON 응답을 위해 @RestController로 변경
@RequestMapping("/board")
public class BoardController {

    @Autowired // 의존성 자동 주입
    private BoardService boardService; // @Service를 --Impl에 등록

    @GetMapping("/grid")
    public List<Grid> gridList() throws Exception {
        List<Grid> gridList = boardService.gridList();
        log.info("그리드 목록: {}", gridList);
        return gridList;
    }

    @PostMapping("/grid/insert")
    public String insertGrid(@RequestBody Grid grid) throws Exception {
        log.info("Grid 데이터 수신: {}", grid);
        // java.sql.Date 대신 LocalDateTime 사용
        grid.setCreatedAt(LocalDateTime.now());
        boardService.insertGrid(grid);
        log.info("Grid 등록 완료: {}", grid);
        return "Grid 등록 성공";
}

    @GetMapping("/list")
    public List<Board> list(@RequestParam(value = "사용여부", required = false, defaultValue = "Y") String 사용여부) throws Exception {
        List<Board> boardList;
        if ("T".equals(사용여부)) {
            // 전체 조회
            boardList = boardService.listAll();
        } else {
            // Y 또는 N으로 필터링된 조회
            boardList = boardService.list(사용여부);
        }
        log.info("사용자 목록 조회 - 사용여부: {}, 결과: {}", 사용여부, boardList);
        return boardList;
    }

    @PostMapping("/insert")
    public String insert(@RequestBody Board board) throws Exception {
        log.info("수신된 데이터: {}", board); // 데이터 확인을 위한 로그 추가
        board.set입력일(new Date(System.currentTimeMillis()));
        board.set숫자형(0.0); // 기본값 설정
        boardService.insert(board);
        log.info("사용자 등록: {}", board);
        return "등록 성공"; // 성공 메시지 반환
    }
}
