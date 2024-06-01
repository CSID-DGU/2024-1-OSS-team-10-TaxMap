package OSSP214.taxmap.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubsidyDTO {
    private long id;
    private String businessName;
    private long receivedSubsidy;
    private long govExpense;
    private long localExpense;
    private long selfExpense;
    private String govOffice;
    private String serviceCategory;

    public SubsidyDTO(Subsidy subsidy) {
        this.id = subsidy.getId();
        this.businessName = subsidy.getBusinessName();
        this.govExpense = subsidy.getGovExpense();
        this.localExpense = subsidy.getLocalExpense();
        this.selfExpense = subsidy.getSelfExpense();
        this.receivedSubsidy = govExpense + localExpense + selfExpense;
        this.govOffice = subsidy.getGovOffice();
        this.serviceCategory = subsidy.getServiceCategory();
    }
}


