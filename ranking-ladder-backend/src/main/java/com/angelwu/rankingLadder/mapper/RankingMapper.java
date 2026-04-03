package com.angelwu.rankingLadder.mapper;
import com.angelwu.rankingLadder.dto.RankingResponseDTO;
import com.angelwu.rankingLadder.model.Ranking;

public class RankingMapper {

    public static RankingResponseDTO toResponse(Ranking ranking) {
    return new RankingResponseDTO(
            ranking.getId(),
            ranking.getUser().getId(),
            ranking.getUser().getName(),
            ranking.getUser().getEmail(),
            ranking.getUser().getGender(),
            ranking.getRank(),
            ranking.getCategory()
    );
}
}


