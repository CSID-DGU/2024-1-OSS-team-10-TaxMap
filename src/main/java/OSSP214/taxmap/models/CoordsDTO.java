package OSSP214.taxmap.models;

import lombok.Getter;
import lombok.Setter;

import java.util.Comparator;
import java.util.List;

@Getter
@Setter
public class CoordsDTO {
    private long id;
    private String address;
    private double latitude;
    private double longitude;

    private long maxTotalSubsidy;
    private List<OrganizationDTO> organizations;

    public CoordsDTO(Coords coords) {
        this.id = coords.getId();
        this.address = coords.getAddress();
        this.latitude = coords.getLatitude();
        this.longitude = coords.getLongitude();

        this.organizations = coords.getOrganizations().stream()
                .map(OrganizationDTO::new)
                .toList();
        this.maxTotalSubsidy = organizations.stream()
                .max(Comparator.comparing(OrganizationDTO::getTotalSubsidies)).get()
                .getTotalSubsidies();
    }
}
