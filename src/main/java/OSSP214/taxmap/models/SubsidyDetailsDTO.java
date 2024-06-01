package OSSP214.taxmap.models;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SubsidyDetailsDTO {
    private Long id;
    private String govOffice;
    private String financialYear;
    private String businessYear;
    private String businessName;
    private String orgName;
    private String representativeName;
    private String phoneNumber;
    private String address;
    private long totalBusinessExpense;
    private long govExpense;
    private long localExpense;
    private long selfExpense;
    private String requestedSubsidy;
    private long govBudget;
    private long localBudget;
    private long requestedPaid;
    private long authorityPaid;
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
    private String serviceCategory;
    private String BusinessSummary;
    private List<String> relatedSubsidyBusinesses;
    private int likes;
    private int dislikes;

    public SubsidyDetailsDTO(Subsidy subsidy) {
        this.id = subsidy.getId();
        this.govOffice = subsidy.getGovOffice();
        this.financialYear = subsidy.getFinancialYear();
        this.businessYear = subsidy.getBusinessYear();
        this.businessName = subsidy.getBusinessName();
        this.orgName = subsidy.getOrgName();
        this.representativeName = subsidy.getRepresentativeName();
        this.phoneNumber = subsidy.getPhoneNumber();
        this.address = subsidy.getAddress();
        this.totalBusinessExpense = subsidy.getTotalBusinessExpense();
        this.govExpense = subsidy.getGovExpense();
        this.localExpense = subsidy.getLocalExpense();
        this.selfExpense = subsidy.getSelfExpense();
        this.requestedSubsidy = subsidy.getRequestedSubsidy();
        this.govBudget = subsidy.getGovBudget();
        this.localBudget = subsidy.getLocalBudget();
        this.requestedPaid = subsidy.getRequestedPaid();
        this.authorityPaid = subsidy.getAuthorityPaid();
        this.businessPurpose = subsidy.getBusinessPurpose();
        this.businessDescription = subsidy.getBusinessDescription();
        this.businessDuration = subsidy.getBusinessDuration();
        this.businessLocation = subsidy.getBusinessLocation();
        this.subjectNumber = subsidy.getSubjectNumber();
        this.miscExpense = subsidy.getMiscExpense();
        this.proceedsProcessMethod = subsidy.getProceedsProcessMethod();
        this.applierAsset = subsidy.getApplierAsset();
        this.expectedBenefit = subsidy.getExpectedBenefit();
        this.performanceGoal = subsidy.getPerformanceGoal();
        this.considerations = subsidy.getConsiderations();
        this.serviceCategory = subsidy.getServiceCategory();
        this.BusinessSummary = subsidy.getBusinessSummary();
        this.relatedSubsidyBusinesses = new ArrayList<>();
        this.likes = subsidy.getLikes();
        this.dislikes = subsidy.getDislikes();
    }
}
