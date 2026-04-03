package com.angelwu.rankingLadder.controller;
import com.angelwu.rankingLadder.dto.UserResponse;
import com.angelwu.rankingLadder.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserResponse(
                        user.getId(),       
                        user.getUcfid(),
                        user.getName(),
                        user.getEmail(),
                        user.getGender()
                ))
                .collect(Collectors.toList());
    }    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Integer id,
            @RequestBody UserResponse userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setName(userDetails.name);
            user.setEmail(userDetails.email);
            try {
                user.setGender(
                        com.angelwu.rankingLadder.model.Gender
                                .valueOf(userDetails.gender.toUpperCase())
                );
            } catch (Exception e) {
            }

            userRepository.save(user);
            return ResponseEntity.ok(new UserResponse(
                    user.getId(),
                    user.getUcfid(),
                    user.getName(),
                    user.getEmail(),
                    user.getGender()
            ));

        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        return userRepository.findById(id).map(user -> {
            userRepository.delete(user);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}