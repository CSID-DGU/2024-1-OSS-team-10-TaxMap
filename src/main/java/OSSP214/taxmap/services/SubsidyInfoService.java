package OSSP214.taxmap.services;

import OSSP214.taxmap.models.SubsidyInfo;
import OSSP214.taxmap.repositories.SubsidyInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubsidyInfoService {

    private final SubsidyInfoRepository subsidyInfoRepository;

    public SubsidyInfoService(SubsidyInfoRepository subsidyInfoRepository) {
        this.subsidyInfoRepository = subsidyInfoRepository;
    }

    public List<SubsidyInfo> getAll() {
        return subsidyInfoRepository.findAll();
    }

    public Optional<SubsidyInfo> getById(Long id) {
        return subsidyInfoRepository.findById(id);
    }

    // public List<SubsidyInfo> getByOrganization(String organization) {return subsidyInfoRepository.}
}
