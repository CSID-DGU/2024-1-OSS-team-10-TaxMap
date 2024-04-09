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

    private String businessPurpose;

    private String businessDescription;

    private String businessDuration;

    private String businessLocation;

    private String subjectNumber;

    private String miscExpense;

    private String proceedsProcessMethod;

    private String applierAsset;

    private String expectedBenefit;

    private String performanceGoal;

    private String considerations;
}
