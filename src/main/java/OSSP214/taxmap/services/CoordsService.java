package OSSP214.taxmap.services;

import OSSP214.taxmap.models.Coords;
import OSSP214.taxmap.models.ViewRange;
import OSSP214.taxmap.repositories.CoordsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CoordsService {

    private final CoordsRepository coordsRepository;

    public CoordsService(CoordsRepository coordsRepository) {
        this.coordsRepository = coordsRepository;
    }


    public List<Coords> getAll() {
        return coordsRepository.findAll();
    }

    public Optional<Coords> getById(Long id) {
        return coordsRepository.findById(id);
    }

    public Optional<Coords> getByLatLng(double lat, double lng) {
        return coordsRepository.findByLatitudeAndLongitude(lat, lng);
    }

    public List<Coords> getByViewRange(ViewRange viewRange) {

        return coordsRepository.findAllByLatitudeBetweenAndLongitudeBetween(
                viewRange.getMinLat(),
                viewRange.getMaxLat(),
                viewRange.getMinLng(),
                viewRange.getMaxLng());
    }
}
