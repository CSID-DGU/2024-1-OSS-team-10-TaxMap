package OSSP214.taxmap.repositories;

import OSSP214.taxmap.models.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    Optional<Organization> findByOrgName(String orgName);
    List<Organization> findAllByAddressNotNull();
}
