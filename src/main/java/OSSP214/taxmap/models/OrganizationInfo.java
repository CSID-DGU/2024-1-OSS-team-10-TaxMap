package OSSP214.taxmap.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
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

    private double locationLatitude;

    private double locationLongitude;

    // private string imageURL;
}
