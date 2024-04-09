package OSSP214.taxmap.services;

import OSSP214.taxmap.models.OrganizationInfo;
import OSSP214.taxmap.repositories.OrganizationInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrganizationInfoService {

    private final OrganizationInfoRepository organizationInfoRepository;

    public OrganizationInfoService(OrganizationInfoRepository organizationInfoRepository) {
        this.organizationInfoRepository = organizationInfoRepository;
    }

    public List<OrganizationInfo> getAll() {
        return organizationInfoRepository.findAll();
    }

    public Optional<OrganizationInfo> getById(Long id) {
        return organizationInfoRepository.findById(id);
    }
}
