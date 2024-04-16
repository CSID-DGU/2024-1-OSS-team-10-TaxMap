package OSSP214.taxmap.services;

import OSSP214.taxmap.models.Organization;
import OSSP214.taxmap.models.Subsidy;
import OSSP214.taxmap.repositories.OrganizationRepository;
import OSSP214.taxmap.repositories.SubsidyRepository;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final SubsidyRepository subsidyRepository;

    public OrganizationService(OrganizationRepository organizationRepository, SubsidyRepository subsidyRepository) {
        this.organizationRepository = organizationRepository;
        this.subsidyRepository = subsidyRepository;
    }

    public List<Organization> getAll() {
        return organizationRepository.findAll();
    }

    public Optional<Organization> getById(Long id) {
        return organizationRepository.findById(id);
    }

    // bean 생성과 서버 시작 사이에 호출되는 메서드
    // 데이터 400개 기준 7.5초정도 걸림

    @EventListener(ContextRefreshedEvent.class)
    @Transactional
    public void init() {
        List<Subsidy> subsidies = subsidyRepository.findAll();
        for (Subsidy subsidy : subsidies) {
            Organization organization = organizationRepository.findByOrgName(subsidy.getOrgName())
                    .orElseGet(() ->
                            Organization.builder()
                                    .subsidies(new ArrayList<>())
                                    .orgName(subsidy.getOrgName())
                                    .representativeName(subsidy.getRepresentativeName())
                                    .phoneNumber(subsidy.getPhoneNumber())
                                    .address(subsidy.getAddress())
                                    .build());

            subsidy.setOrgInfo(organization);

            organization.getSubsidies().add(subsidy);
            organizationRepository.save(organization);
        }
    }
}
