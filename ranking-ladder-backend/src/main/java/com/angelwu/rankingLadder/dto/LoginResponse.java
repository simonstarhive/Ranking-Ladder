package com.angelwu.rankingLadder.dto;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginResponse {
    public boolean success;
    public String name;
    public String gender;
    public String role;
    public Integer rank;
    public String error;
    public String message;
}
