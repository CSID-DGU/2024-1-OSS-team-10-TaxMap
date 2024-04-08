package OSSP214.taxmap.controllers;

import OSSP214.taxmap.models.Coords;
import OSSP214.taxmap.models.OrganizationInfo;
import OSSP214.taxmap.models.SubsidyInfo;
import OSSP214.taxmap.services.SubsidyInfoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/map")
public class MainController {
    private final SubsidyInfoService subsidyInfoService;

    public MainController(SubsidyInfoService subsidyInfoService) {
        this.subsidyInfoService = subsidyInfoService;
    }


//    @GetMapping
//    public List<OrganizationInfo> getMarkers(@RequestBody List<Coords> coords) {
//
//    }
//
//    @GetMapping(path = "/{id}")
//    public OrganizationInfo getOrganizationInfo(@PathVariable Long id) {
//
//    }

    @RequestMapping(path = "/{id}")
    public SubsidyInfo one(@PathVariable Long id) {
        Optional<SubsidyInfo> subsidyInfoOptional = subsidyInfoService.getById(id);
        return subsidyInfoOptional.orElse(null);
    }

    @RequestMapping(path = "/all")
    public List<SubsidyInfo> all() {
        List<SubsidyInfo> subsidyInfoList = subsidyInfoService.getAll();
        for (SubsidyInfo subsidyInfo : subsidyInfoList) {System.out.println(subsidyInfo.getId());}
        return subsidyInfoList;
    }
}
