package OSSP214.taxmap.repositories;


import OSSP214.taxmap.models.Subsidy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubsidyRepository extends JpaRepository<Subsidy, Long> {

}
