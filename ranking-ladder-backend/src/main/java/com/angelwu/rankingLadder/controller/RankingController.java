package com.angelwu.rankingLadder.controller;
import com.angelwu.rankingLadder.dto.RankingRequestDTO;
import com.angelwu.rankingLadder.dto.RankingResponseDTO;
import com.angelwu.rankingLadder.service.RankingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


@RestController
@RequestMapping("/api/rankings")
public class RankingController {
    private final RankingService rankingService;
    public RankingController(RankingService rankingService) {
        this.rankingService = rankingService;
    }
    //  CREATE
    @PostMapping
    public ResponseEntity<RankingResponseDTO> addRanking(
            @Valid @RequestBody RankingRequestDTO request
    ) {
        RankingResponseDTO response = rankingService.create(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    //  GET ALL
    @GetMapping
    public Page<RankingResponseDTO> getAll(Pageable pageable) {
        return rankingService.getAll(pageable);
    }
    //  GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<RankingResponseDTO> getById(@PathVariable Integer id) {
        RankingResponseDTO response = rankingService.findById(id);
        return ResponseEntity.ok(response);
    }
    //  UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<RankingResponseDTO> update(
            @PathVariable Integer id,
            @Valid @RequestBody RankingRequestDTO request
    ) {
        RankingResponseDTO updated = rankingService.update(id, request);
        return ResponseEntity.ok(updated);
    }
    //  DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRanking(@PathVariable Integer id) {
        rankingService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
