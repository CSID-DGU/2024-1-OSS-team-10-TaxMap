package OSSP214.taxmap.controllers;

import OSSP214.taxmap.models.Subsidy;
import OSSP214.taxmap.services.SubsidyService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/subsidy")
public class SubsidyController {
    private final SubsidyService subsidyService;

    public SubsidyController(SubsidyService subsidyService) {
        this.subsidyService = subsidyService;
    }


    @RequestMapping(path = "/all")
    public List<Subsidy> all() {
        List<Subsidy> subsidyList = subsidyService.getAll();
        for (Subsidy subsidy : subsidyList) {System.out.println(subsidy.getId());}
        return subsidyList;
    }

    @RequestMapping(path = "/{id}")
    public Subsidy one(@PathVariable Long id) {
        Optional<Subsidy> subsidyInfoOptional = subsidyService.getById(id);
        return subsidyInfoOptional.orElse(null);
    }
}
