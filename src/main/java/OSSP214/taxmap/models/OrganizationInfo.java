package OSSP214.taxmap.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
// @Table(name = "organizations")
public class OrganizationInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orgName;

    @ManyToOne
    @JoinColumn
    private Coords coords;

    @OneToMany(mappedBy = "orgInfo")
    List<SubsidyInfo> subsidyInfos;

    private String representativeName;

    private String phoneNumber;

    private String address;

    // private string imageURL;
}
