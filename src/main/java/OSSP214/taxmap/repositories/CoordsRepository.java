package OSSP214.taxmap.repositories;

import OSSP214.taxmap.models.Coords;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CoordsRepository extends JpaRepository<Coords, Long> {
    Optional<Coords> findByLatitudeAndLongitude(double latitude, double longitude);
    List<Coords> findAllByLatitudeBetweenAndLongitudeBetween(double latMin, double latMax, double lngMin, double lngMax);
}
