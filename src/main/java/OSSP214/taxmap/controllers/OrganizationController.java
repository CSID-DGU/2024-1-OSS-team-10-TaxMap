package OSSP214.taxmap.controllers;


import OSSP214.taxmap.models.Organization;
import OSSP214.taxmap.models.OrganizationDTO;
import OSSP214.taxmap.services.OrganizationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/org")
public class OrganizationController {

    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }


    // 모든 기업 검색
    @GetMapping(path = "/all")
    public List<OrganizationDTO> all() {
        List<Organization> organizations = organizationService.getAll();
        return organizations.stream()
                .map(OrganizationDTO::new)
                .toList();
    }

    // 기업 id로 검색
    @GetMapping(path = "/{id}")
    public OrganizationDTO one(@PathVariable Long id) {
        return new OrganizationDTO(organizationService.getById(id).orElseThrow());
    }

    @GetMapping(path = "/list/{name}")
    public List<OrganizationDTO> like(@PathVariable String name) {
        List<Organization> organizations = organizationService.getByNameLike(name);
        return organizations.stream()
                .map(OrganizationDTO::new)
                .toList();
    }
}
