package OSSP214.taxmap.models;

import jakarta.persistence.*;

@Entity
// @Table(name = "organizations")
public class OrganizationInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orgName;

    private String representativeName;

    private String phoneNumber;

    private String address;

    private double locationLatitude;

    private double locationLongitude;
}
