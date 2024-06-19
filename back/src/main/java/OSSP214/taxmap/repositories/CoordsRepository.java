package OSSP214.taxmap.repositories;

import OSSP214.taxmap.models.Coords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CoordsRepository extends JpaRepository<Coords, Long> {
    Optional<Coords> findByLatitudeAndLongitude(double latitude, double longitude);

    @Query(value = "select distinct c from Coords c join fetch c.organizations where c.latitude between :latMin and :latMax and c.longitude between :lngMin and :lngMax")
    List<Coords> findAllByViewRange(@Param("latMin") double latMin, @Param("latMax") double latMax, @Param("lngMin") double lngMin, @Param("lngMax") double lngMax);
}
