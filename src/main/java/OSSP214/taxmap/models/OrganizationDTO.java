package OSSP214.taxmap.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrganizationDTO {
    private long id;
    private String name;
    private String representative;
    private String phoneNumber;

    private long totalSubsidies;
    private List<SubsidyDTO> subsidies;

    public OrganizationDTO(Organization org) {
        this.id = org.getId();
        this.name = org.getOrgName();
        this.representative = org.getRepresentativeName();
        this.phoneNumber = org.getPhoneNumber();
        this.subsidies = org.getSubsidies().stream()
                .map(SubsidyDTO::new)
                .toList();
         this.totalSubsidies = subsidies.stream()
                .mapToLong(SubsidyDTO::getRequestedSubsidy).sum();
    }
}
