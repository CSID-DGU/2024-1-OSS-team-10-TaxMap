package OSSP214.taxmap.repositories;


import OSSP214.taxmap.models.SubsidyInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubsidyInfoRepository extends JpaRepository<SubsidyInfo, Long> {

}
