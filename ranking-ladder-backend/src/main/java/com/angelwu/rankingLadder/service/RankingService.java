package com.angelwu.rankingLadder.service;
import com.angelwu.rankingLadder.dto.RankingRequestDTO;
import com.angelwu.rankingLadder.dto.RankingResponseDTO;
import com.angelwu.rankingLadder.exception.RankingNotFoundException;
import com.angelwu.rankingLadder.mapper.RankingMapper;
import com.angelwu.rankingLadder.model.Ranking;
import com.angelwu.rankingLadder.model.User;
import com.angelwu.rankingLadder.repository.RankingRepository;
import com.angelwu.rankingLadder.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class RankingService {

    private final RankingRepository rankingRepository;
    private final UserRepository userRepository;

    public RankingService(RankingRepository rankingRepository,
                          UserRepository userRepository) {
        this.rankingRepository = rankingRepository;
        this.userRepository = userRepository;
    }

    public RankingResponseDTO create(RankingRequestDTO request) {        
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean alreadyExists = user.getRankings().stream()
                .anyMatch(r -> r.getCategory() == request.category());

        if (alreadyExists) {
            throw new RuntimeException("User already ranked in this category");
        }
        Ranking ranking = new Ranking();
        ranking.setRank(request.rank());
        ranking.setCategory(request.category());       
        ranking.setUser(user);        
        user.getRankings().add(ranking);
        Ranking saved = rankingRepository.save(ranking);
        return RankingMapper.toResponse(saved);
    }

    
    public RankingResponseDTO update(Integer id, RankingRequestDTO request) {
        Ranking ranking = rankingRepository.findById(id)
                .orElseThrow(() -> new RankingNotFoundException(id));
        ranking.setRank(request.rank());
        ranking.setCategory(request.category());
        Ranking updated = rankingRepository.save(ranking);
        return RankingMapper.toResponse(updated);
    }

    
    public void delete(Integer id) {
        Ranking ranking = rankingRepository.findById(id)
                .orElseThrow(() -> new RankingNotFoundException(id));
        User user = ranking.getUser();
        if (user != null) {
            // REMOVE FROM LIST
            user.getRankings().remove(ranking);
        }
        rankingRepository.delete(ranking);
    }
    
    public RankingResponseDTO findById(Integer id) {
        Ranking ranking = rankingRepository.findById(id)
                .orElseThrow(() -> new RankingNotFoundException(id));
        return RankingMapper.toResponse(ranking);
    }

    
    public Page<RankingResponseDTO> getAll(Pageable pageable) {
        return rankingRepository.findAll(pageable)
                .map(RankingMapper::toResponse);
    }
}