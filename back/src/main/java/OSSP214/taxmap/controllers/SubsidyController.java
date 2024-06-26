package OSSP214.taxmap.controllers;

import OSSP214.taxmap.models.Subsidy;
import OSSP214.taxmap.models.SubsidyDTO;
import OSSP214.taxmap.models.SubsidyDetailsDTO;
import OSSP214.taxmap.services.SubsidyService;
import OSSP214.taxmap.services.SubsidyBusinessService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/subsidy")
public class SubsidyController {
    private final SubsidyService subsidyService;
    private final SubsidyBusinessService subsidyBusinessService;

    public SubsidyController(SubsidyService subsidyService, SubsidyBusinessService subsidybusinessService) {
        this.subsidyService = subsidyService;
        this.subsidyBusinessService = subsidybusinessService;
    }

    // 보조금 정보에 존재하는 중앙부처 list 받아오기
    @GetMapping(path = "/govofficelist")
    public List<String> govOfficeList() {
        return subsidyService.getGovOfficeList();
    }


    // 모든 보조금 검색
    @GetMapping(path = "/all")
    public List<SubsidyDTO> all() {
        List<Subsidy> subsidies = subsidyService.getAll();
        return subsidies.stream()
                .map(SubsidyDTO::new)
                .toList();
    }

    // 보조금 id로 검색
    @GetMapping(path = "/{id}")
    public SubsidyDetailsDTO one(@PathVariable Long id) {
        SubsidyDetailsDTO dto = new SubsidyDetailsDTO(subsidyService.getById(id).orElseThrow());
        dto.setRelatedSubsidyBusinesses(subsidyBusinessService.getTwoRandomName(dto.getServiceCategory()));
        return dto;
    }

    @PostMapping(path = "/like/{id}")
    public ResponseEntity<String> like(@PathVariable Long id) {
        subsidyService.like(id);
        return ResponseEntity.ok().body("좋아요");
    }

    @PostMapping(path = "/dislike/{id}")
    public ResponseEntity<String> dislike(@PathVariable Long id) {
        subsidyService.dislike(id);
        return ResponseEntity.ok().body("싫어요");
    }
}
