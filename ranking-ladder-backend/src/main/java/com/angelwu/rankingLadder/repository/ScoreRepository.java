package com.angelwu.rankingLadder.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.angelwu.rankingLadder.model.Score;
import com.angelwu.rankingLadder.model.Gender;
import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Integer> {
    List<Score> findByGender(Gender gender);
    
}
