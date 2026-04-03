package com.angelwu.rankingLadder.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class SignupRequest {
    @NotBlank(message="Name is required")
    public String name;

    @NotBlank(message="Email is required")
    @Email(message="Invalid email format")
    public String email;
    @NotBlank(message="Password is required")
    public String password;
    @NotNull(message="UCFID is required")
    @Positive(message="UCFID not valid")
    public int ucfid;
    @NotBlank(message="Gender is required")
    public String gender;
}
