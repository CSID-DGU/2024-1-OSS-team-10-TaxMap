package OSSP214.taxmap.services;

import OSSP214.taxmap.models.Subsidy;
import OSSP214.taxmap.repositories.SubsidyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubsidyService {

    private final SubsidyRepository subsidyRepository;

    public SubsidyService(SubsidyRepository subsidyRepository) {
        this.subsidyRepository = subsidyRepository;
    }

    public List<Subsidy> getAll() {
        return subsidyRepository.findAll();
    }

    public Optional<Subsidy> getById(Long id) {
        return subsidyRepository.findById(id);
    }

    public List<String> getGovOfficeList() { return subsidyRepository.getDistinctGovOffice(); }

    public void like(Long id) {
        Subsidy subsidy = subsidyRepository.findById(id).orElseThrow();
        subsidy.setLikes(subsidy.getLikes() + 1);
        subsidyRepository.save(subsidy);
    }

    public void dislike(Long id) {
        Subsidy subsidy = subsidyRepository.findById(id).orElseThrow();
        subsidy.setDislikes(subsidy.getDislikes() + 1);
        subsidyRepository.save(subsidy);
    }
}
