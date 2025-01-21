package com.skyw.board.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skyw.board.dto.Board;
import com.skyw.board.dto.Grid;
import com.skyw.board.mapper.BoardMapper;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardMapper boardMapper;

    // @Override
    // public List<Board> list() throws Exception {
    //     return boardMapper.list();
    // }
    
    @Override
    public List<Board> list(String 사용여부) throws Exception {
        return boardMapper.list(사용여부);
    }

    @Override
    public List<Board> listAll() throws Exception {
        return boardMapper.listAll();
    }

    @Override
    public List<Grid> gridList() throws Exception {
        return boardMapper.gridList();
    }
    
    @Override
    public void insertGrid(Grid grid) throws Exception {
        boardMapper.insertGrid(grid);
    }

    @Override
    public int insert(Board board) throws Exception {
        // 사용자ID 필드 검증
        // if (board.get사용자ID() == null || board.get사용자ID().trim().isEmpty()) {
        //     throw new IllegalArgumentException("사용자ID는 필수 입력 값입니다."); 
        // }

        return boardMapper.insert(board);
    }
}