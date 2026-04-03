package com.angelwu.rankingLadder.auth;
import com.angelwu.rankingLadder.dto.LoginRequest;
import com.angelwu.rankingLadder.dto.LoginResponse;
import com.angelwu.rankingLadder.dto.SignupRequest;
import com.angelwu.rankingLadder.model.Gender;
import com.angelwu.rankingLadder.model.User;
import com.angelwu.rankingLadder.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class AuthService {
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final String dummyHash;
    public AuthService(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.dummyHash = passwordEncoder.encode(UUID.randomUUID().toString());
    }
    // login
    public LoginResponse login(LoginRequest req) {
        LoginResponse res = new LoginResponse();
        var userOpt = userRepo.findByEmail  (req.email);
        var userPassword = userOpt.map(User::getPassword).orElse(this.dummyHash);
        var passwordMatches = passwordEncoder.matches(req.password, userPassword);
        var userExists = userOpt.isPresent();
        if (!userExists || !passwordMatches) {
            res.success = false;
            res.message = "Invalid credentials";
            return res;
        }
        User user = userOpt.get();
        res.success = true;
        res.name = user.getName();
        res.gender = user.getGender().name().toLowerCase();
        res.role =(user.getRole() !=null)? user.getRole().name():"USER";
        res.message = "Login successful";
        return res;
    }

    // SIGNUP
    public LoginResponse signup(SignupRequest req) {
        LoginResponse res = new LoginResponse();
        if (userRepo.findById(req.ucfid).isPresent()) {
            res.success = false;
            res.message = "Ucfid already exists";
            return res;
        }

        Gender gender;
        try {
            gender = Gender.valueOf(req.gender.toUpperCase());
        } catch (Exception e) {
            res.success = false;
            res.message = "Invalid gender. Use MALE or FEMALE";
            return res;
        }
        User user = new User();
        user.setName(req.name);
        user.setEmail(req.email);
        user.setPassword(passwordEncoder.encode(req.password));
        user.setGender(gender);
        user.setUcfid(req.ucfid);
        user.setRole(com.angelwu.rankingLadder.model.Role.USER);
        userRepo.save(user);

        res.success = true;
        res.name = user.getName();
        res.gender = user.getGender().name().toLowerCase();
        res.role = user.getRole().name();
        res.message = "Signup successful";

        return res;
    }
}
