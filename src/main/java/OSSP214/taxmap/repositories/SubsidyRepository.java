package OSSP214.taxmap.repositories;


import OSSP214.taxmap.models.Subsidy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubsidyRepository extends JpaRepository<Subsidy, Long> {

    @Query("select distinct s.govOffice from Subsidy s")
    List<String> getDistinctGovOffice();
}
