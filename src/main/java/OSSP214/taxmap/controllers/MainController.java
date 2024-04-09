package OSSP214.taxmap.controllers;

import OSSP214.taxmap.models.OrganizationInfo;
import OSSP214.taxmap.services.OrganizationInfoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/map")
public class MainController {
    private final OrganizationInfoService organizationInfoService;

    public MainController(OrganizationInfoService organizationInfoService) {
        this.organizationInfoService = organizationInfoService;
    }


//    @GetMapping
//    public List<OrganizationInfo> getMarkers(@RequestBody Coords[] coords) {
//        organizationInfoRepository.
//    }

    @GetMapping(path = "/all")
    public List<OrganizationInfo> all() {
        return organizationInfoService.getAll();
    }

    @GetMapping(path = "/{id}")
    public OrganizationInfo one(@PathVariable Long id) {
        return organizationInfoService.getById(id).orElseThrow();
    }
}
