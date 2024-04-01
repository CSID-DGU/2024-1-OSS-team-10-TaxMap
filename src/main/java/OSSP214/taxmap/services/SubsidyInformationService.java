package OSSP214.taxmap.services;

import OSSP214.taxmap.repositories.SubsidyInformationRepository;
import org.springframework.stereotype.Service;

@Service
public class SubsidyInformationService {

    private final SubsidyInformationRepository subsidyInformationRepository;

    public SubsidyInformationService(SubsidyInformationRepository subsidyInformationRepository) {
        this.subsidyInformationRepository = subsidyInformationRepository;
    }
}
