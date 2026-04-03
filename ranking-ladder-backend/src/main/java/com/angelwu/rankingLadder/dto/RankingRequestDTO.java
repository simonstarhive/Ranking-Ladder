package com.angelwu.rankingLadder.dto;
import com.angelwu.rankingLadder.model.RankingCategory;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record RankingRequestDTO(

        @NotNull(message = "User ID is required")
        Integer userId,

        @NotNull(message = "Rank is required")
        @Min(value = 1, message = "Rank must be at least 1")
        Integer rank,

        @NotNull(message = "Category is required")
        RankingCategory category

) {}