package OSSP214.taxmap.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubsidyDTO {
    private long id;
    private String businessName;
    private long requestedSubsidy;

    public SubsidyDTO(Subsidy subsidy) {
        this.id = subsidy.getId();
        this.businessName = subsidy.getBusinessName();
        // this.requestedSubsidy = subsidy.getRequestedSubsidy();
        this.requestedSubsidy = 1000;
    }
}


