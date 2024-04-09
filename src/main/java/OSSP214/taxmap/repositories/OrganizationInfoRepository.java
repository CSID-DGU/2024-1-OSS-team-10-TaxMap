package OSSP214.taxmap.repositories;

import OSSP214.taxmap.models.OrganizationInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationInfoRepository extends JpaRepository<OrganizationInfo, Long> {
}
