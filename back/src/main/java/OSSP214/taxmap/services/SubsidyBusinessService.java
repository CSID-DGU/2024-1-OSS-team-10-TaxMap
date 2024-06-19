package OSSP214.taxmap.services;

import OSSP214.taxmap.models.SubsidyBusiness;
import OSSP214.taxmap.repositories.SubsidyBusinessRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@Service
public class SubsidyBusinessService {

    private final SubsidyBusinessRepository subsidyBusinessRepository;
    private final Random rand;

    public SubsidyBusinessService(SubsidyBusinessRepository subsidyBusinessRepository) {
        this.subsidyBusinessRepository = subsidyBusinessRepository;
        rand = new Random();
    }

    public List<String> getTwoRandomName(String serviceCategory) {
        List<SubsidyBusiness> businesses = subsidyBusinessRepository.getAllByServiceCategory(serviceCategory);
        List<String> names = new ArrayList<>();
        names.add(businesses.get(rand.nextInt(businesses.size())).getBusinessName());
        names.add(businesses.get(rand.nextInt(businesses.size())).getBusinessName());
        return names;
    }
}
