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

    private int financialYear;

    private int businessYear;

    private String businessName;

    private String orgName;

    private String representativeName;

    private String phoneNumber;

    private String address;

    private Long totalBusinessExpense;

    private Long govExpense;

    private Long localExpense;

    private Long selfExpense;

    private Long requestedSubsidy;

    private Long govBudget;

    private Long localBudget;

    private Long requestedPaid;

    private Long authorityPaid;

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
