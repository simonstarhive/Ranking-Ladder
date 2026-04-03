package com.angelwu.rankingLadder.service;
import org.springframework.stereotype.Service;
import com.angelwu.rankingLadder.model.Score;   
import com.angelwu.rankingLadder.model.Gender;
import com.angelwu.rankingLadder.repository.ScoreRepository;
import java.util.List;

@Service
public class ScoreService {

    private final ScoreRepository scoreRepository;

    public ScoreService(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }
    public List<Score> getScores(Gender gender) {
        return scoreRepository.findByGender(gender);
    }
    public Score addScore(Score score) {
        return scoreRepository.save(score);
    }
    public void deleteScore(Integer id) {
        scoreRepository.deleteById(id);
    }

    public Score updateScore(Integer id, Score updated) {
        Score score = scoreRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Score not found"));
        score.setPlayerA(updated.getPlayerA());
        score.setPlayerB(updated.getPlayerB());
        score.setScore(updated.getScore());
        score.setGender(updated.getGender());

        return scoreRepository.save(score);
    }
}

