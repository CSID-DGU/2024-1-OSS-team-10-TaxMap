package OSSP214.taxmap.controllers;

import OSSP214.taxmap.models.Subsidy;
import OSSP214.taxmap.models.SubsidyDTO;
import OSSP214.taxmap.services.SubsidyService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/subsidy")
public class SubsidyController {
    private final SubsidyService subsidyService;

    public SubsidyController(SubsidyService subsidyService) {
        this.subsidyService = subsidyService;
    }


    // 모든 보조금 검색
    @RequestMapping(path = "/all")
    public List<SubsidyDTO> all() {
        List<Subsidy> subsidies = subsidyService.getAll();
        return subsidies.stream()
                .map(SubsidyDTO::new)
                .toList();
    }

    // 보조금 id로 검색
    @RequestMapping(path = "/{id}")
    public Subsidy one(@PathVariable Long id) {
        return subsidyService.getById(id).orElseThrow();
    }
}
