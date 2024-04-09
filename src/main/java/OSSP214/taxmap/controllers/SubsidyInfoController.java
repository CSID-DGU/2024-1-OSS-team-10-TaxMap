package OSSP214.taxmap.controllers;

import OSSP214.taxmap.models.SubsidyInfo;
import OSSP214.taxmap.services.SubsidyInfoService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/subsidy")
public class SubsidyInfoController {
    private final SubsidyInfoService subsidyInfoService;

    public SubsidyInfoController(SubsidyInfoService subsidyInfoService) {
        this.subsidyInfoService = subsidyInfoService;
    }


    @RequestMapping(path = "/all")
    public List<SubsidyInfo> all() {
        List<SubsidyInfo> subsidyInfoList = subsidyInfoService.getAll();
        for (SubsidyInfo subsidyInfo : subsidyInfoList) {System.out.println(subsidyInfo.getId());}
        return subsidyInfoList;
    }

    @RequestMapping(path = "/{id}")
    public SubsidyInfo one(@PathVariable Long id) {
        Optional<SubsidyInfo> subsidyInfoOptional = subsidyInfoService.getById(id);
        return subsidyInfoOptional.orElse(null);
    }
}
