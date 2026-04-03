package com.angelwu.rankingLadder.exception;

public class RankingNotFoundException extends RuntimeException {
    
    public RankingNotFoundException(Integer id) {
        super("Ranking not found with id: " + id);
    }
    
}
