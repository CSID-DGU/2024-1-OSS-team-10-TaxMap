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

    public OrganizationService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }


    public List<Organization> getAll() {
        return organizationRepository.findAll();
    }

    public Optional<Organization> getById(Long id) {
        return organizationRepository.findById(id);
    }
}
