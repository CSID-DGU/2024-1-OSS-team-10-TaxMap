package OSSP214.taxmap.services;

import OSSP214.taxmap.models.OrganizationInfo;
import OSSP214.taxmap.models.SubsidyInfo;
import OSSP214.taxmap.repositories.OrganizationInfoRepository;
import OSSP214.taxmap.repositories.SubsidyInfoRepository;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrganizationInfoService {

    private final OrganizationInfoRepository organizationInfoRepository;
    private final SubsidyInfoRepository subsidyInfoRepository;

    public OrganizationInfoService(OrganizationInfoRepository organizationInfoRepository, SubsidyInfoRepository subsidyInfoRepository) {
        this.organizationInfoRepository = organizationInfoRepository;
        this.subsidyInfoRepository = subsidyInfoRepository;
    }

    public List<OrganizationInfo> getAll() {
        return organizationInfoRepository.findAll();
    }

    public Optional<OrganizationInfo> getById(Long id) {
        return organizationInfoRepository.findById(id);
    }

    // bean 생성과 서버 시작 사이에 호출되는 메서드
    // 데이터 400개 기준 7.5초정도 걸림

    @EventListener(ContextRefreshedEvent.class)
    public void init() {
        List<SubsidyInfo> subsidyInfos = subsidyInfoRepository.findAll();
        for (SubsidyInfo subsidyInfo : subsidyInfos) {
            if (organizationInfoRepository.findByOrgName(subsidyInfo.getOrgName()).isEmpty()) {
                OrganizationInfo newOrganizationInfo = OrganizationInfo.builder()
                        .orgName(subsidyInfo.getOrgName())
                        .representativeName(subsidyInfo.getRepresentativeName())
                        .phoneNumber(subsidyInfo.getPhoneNumber())
                        .address(subsidyInfo.getAddress())
                        .build();

                organizationInfoRepository.save(newOrganizationInfo);
            }
        }
    }
}
