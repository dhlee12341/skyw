package com.skyw.board.mapper;

import java.util.List;

// import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
// import org.apache.ibatis.annotations.Options;

import com.skyw.board.dto.Board;
import com.skyw.board.dto.Grid;

@Mapper
public interface BoardMapper {
    // 사용자 조회
    List<Board> list(String 사용여부) throws Exception;
    List<Board> listAll() throws Exception;
    
    // 사용자 등록
    int insert(Board board) throws Exception;
    
    // 그리드리스트
    List<Grid> gridList() throws Exception;
    void insertGrid(Grid grid) throws Exception;

}
