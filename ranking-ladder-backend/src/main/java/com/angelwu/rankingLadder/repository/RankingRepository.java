package com.angelwu.rankingLadder.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Sort;
import com.angelwu.rankingLadder.model.Ranking;
import com.angelwu.rankingLadder.model.RankingCategory;
import java.util.List;

public interface RankingRepository extends JpaRepository<Ranking, Integer> {
    List<Ranking> findByCategory(RankingCategory category, Sort sort);
    List<Ranking> findByUserId(int userId, Sort sort);
    
}
