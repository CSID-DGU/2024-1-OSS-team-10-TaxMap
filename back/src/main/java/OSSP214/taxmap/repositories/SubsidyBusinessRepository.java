package OSSP214.taxmap.repositories;

import OSSP214.taxmap.models.SubsidyBusiness;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubsidyBusinessRepository extends JpaRepository<SubsidyBusiness, Long> {
    List<SubsidyBusiness> getAllByServiceCategory(String serviceCategory);
}
