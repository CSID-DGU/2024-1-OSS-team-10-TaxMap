package OSSP214.taxmap.repositories;


import OSSP214.taxmap.models.SubsidyInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubsidyInformationRepository extends JpaRepository<SubsidyInformation, Long> {
}
