package OSSP214.taxmap.repositories;

import OSSP214.taxmap.models.Coords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoordsRepository extends JpaRepository<Coords, Long> {
}
