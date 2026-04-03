package com.angelwu.rankingLadder.dto;
import com.angelwu.rankingLadder.model.Gender;
import com.angelwu.rankingLadder.model.RankingCategory;

public record RankingResponseDTO(
        Integer rankingId,
        Integer userId,
        String name,
        String email,
        Gender gender,
        Integer rank,
        RankingCategory category
) {}