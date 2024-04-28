package OSSP214.taxmap.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

// 기업 정보
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orgName;

    @ManyToOne

    @JoinColumn
    private Coords coordsInfo;

    private String representativeName;

    private String phoneNumber;

    private String address;

    // private string imageURL;

    @OneToMany(mappedBy = "orgInfo")
    List<Subsidy> subsidies;
}
