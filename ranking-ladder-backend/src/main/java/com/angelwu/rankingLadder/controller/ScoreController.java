package com.angelwu.rankingLadder.controller;
import com.angelwu.rankingLadder.model.Gender;
import com.angelwu.rankingLadder.model.Score;
import com.angelwu.rankingLadder.service.ScoreService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/scores")
public class ScoreController {
    private final ScoreService scoreService;
    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }
    // USERS
    @GetMapping
    public List<Score> getScores(@RequestParam Gender gender) {
        return scoreService.getScores(gender);
    }
    // ADMIN
    @PostMapping
    public Score addScore(@RequestBody Score score) {
        return scoreService.addScore(score);
    }
    @PutMapping("/{id}")
    public Score updateScore(@PathVariable Integer id,
                             @RequestBody Score score) {
        return scoreService.updateScore(id, score);
    }
    @DeleteMapping("/{id}")
    public void deleteScore(@PathVariable Integer id) {
    scoreService.deleteScore(id);
    }
}
