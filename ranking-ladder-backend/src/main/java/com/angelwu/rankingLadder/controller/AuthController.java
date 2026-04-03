package com.angelwu.rankingLadder.controller;
import com.angelwu.rankingLadder.dto.LoginRequest;
import com.angelwu.rankingLadder.dto.LoginResponse;
import com.angelwu.rankingLadder.dto.SignupRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.angelwu.rankingLadder.auth.AuthService;
@RestController
@RequestMapping("/api/auth")   
public class AuthController {

    private final AuthService authService;
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<LoginResponse> signup(@Valid @RequestBody SignupRequest req) {
        LoginResponse res = authService.signup(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid  @RequestBody LoginRequest req) {
        LoginResponse res = authService.login(req);

        if (!res.success) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(res);
        }
        return ResponseEntity.ok(res);
    }
}
