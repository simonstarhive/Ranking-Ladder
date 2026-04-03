package com.angelwu.rankingLadder.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "score")
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String playerA;
    private String playerB;
    private String score;

    @Enumerated(EnumType.STRING)
    private Gender gender;

}


