package OSSP214.taxmap.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SubsidyInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String govOffice;

    private String financialYear;

    private String businessYear;

    private String businessName;

    @ManyToOne
    @JoinColumn
    private OrganizationInfo orgInfo;

    private String orgName;

    private String representativeName;

    private String phoneNumber;

    private String address;

    private String totalBusinessExpense;

    private String govExpense;

    private String localExpense;

    private String selfExpense;

    private String requestedSubsidy;

    private String govBudget;

    private String localBudget;

    private String requestedPaid;

    private String authorityPaid;

    @Column(columnDefinition = "TEXT")
    private String businessPurpose;

    @Column(columnDefinition = "TEXT")
    private String businessDescription;

    @Column(columnDefinition = "TEXT")
    private String businessDuration;

    @Column(columnDefinition = "TEXT")
    private String businessLocation;

    @Column(columnDefinition = "TEXT")
    private String subjectNumber;

    @Column(columnDefinition = "TEXT")
    private String miscExpense;

    @Column(columnDefinition = "TEXT")
    private String proceedsProcessMethod;

    @Column(columnDefinition = "TEXT")
    private String applierAsset;

    @Column(columnDefinition = "TEXT")
    private String expectedBenefit;

    @Column(columnDefinition = "TEXT")
    private String performanceGoal;

    @Column(columnDefinition = "TEXT")
    private String considerations;
}
