package com.angelwu.rankingLadder.model;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "users") 
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false, unique = true)
    private int ucfid; 

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email; 

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ranking> rankings = new ArrayList<>();


    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public int getUcfid() { return ucfid; }
    public void setUcfid(int ucfid) { this.ucfid = ucfid; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Gender getGender() { return gender; }
    public void setGender(Gender gender) { this.gender = gender; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public List<Ranking> getRankings() { return rankings; }
    public void setRankings(List<Ranking> rankings) { this.rankings = rankings; }
    
    public void addRanking(Ranking ranking) {
        rankings.add(ranking);
        ranking.setUser(this);
    }

    public void removeRanking(Ranking ranking) {
        rankings.remove(ranking);
        ranking.setUser(null);
    }
}