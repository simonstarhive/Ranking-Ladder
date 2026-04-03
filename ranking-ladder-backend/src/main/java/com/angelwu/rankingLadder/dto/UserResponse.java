package com.angelwu.rankingLadder.dto;
import com.angelwu.rankingLadder.model.Gender;

public class UserResponse {
    public Integer id;
    public int ucfid;
    public String name;
    public String email;
    public String gender;

    public UserResponse(Integer id, int ucfid, String name, String email, Gender gender) {
        this.id = id;
        this.ucfid = ucfid;
        this.name = name;
        this.email = email;
        this.gender = (gender != null) ? gender.toString() : "MALE";
    }
}