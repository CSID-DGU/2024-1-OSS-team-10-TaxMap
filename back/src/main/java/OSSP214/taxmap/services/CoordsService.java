package OSSP214.taxmap.services;

import OSSP214.taxmap.models.Coords;
import OSSP214.taxmap.models.Organization;
import OSSP214.taxmap.models.Subsidy;
import OSSP214.taxmap.models.ViewRange;
import OSSP214.taxmap.repositories.CoordsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
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
        log.info("getByViewRange: {}", viewRange.toString());
        long startingTime = System.currentTimeMillis();

        List<Coords> coordsList = coordsRepository.findAllByViewRange(
                viewRange.getMinLat(),
                viewRange.getMaxLat(),
                viewRange.getMinLng(),
                viewRange.getMaxLng());
        long queryTime = System.currentTimeMillis();


        // 필터링 로직
        if (viewRange.getGovOfficeFilter() != null) {
            for (Coords coords : coordsList) {
                List<Organization> organizations = coords.getOrganizations();
                for (Organization organization : organizations) {
                    List<Subsidy> subsidies = organization.getSubsidies();
                    subsidies.removeIf(subsidy -> !subsidy.getGovOffice().equals(viewRange.getGovOfficeFilter()));
                }
                organizations.removeIf(organization -> organization.getSubsidies().isEmpty());
            }
            coordsList.removeIf(coords -> coords.getOrganizations().isEmpty());
        }

        if (viewRange.getServiceCategoryFilter() != null) {
            for (Coords coords : coordsList) {
                List<Organization> organizations = coords.getOrganizations();
                for (Organization organization : organizations) {
                    List<Subsidy> subsidies = organization.getSubsidies();
                    subsidies.removeIf(subsidy -> !subsidy.getServiceCategory().equals(viewRange.getServiceCategoryFilter()));
                }
                organizations.removeIf(organization -> organization.getSubsidies().isEmpty());
            }
            coordsList.removeIf(coords -> coords.getOrganizations().isEmpty());
        }

        long filterTime = System.currentTimeMillis();
        log.info("query time: {}ms, filter time: {}ms", queryTime - startingTime, filterTime - queryTime);

        return coordsList;
    }
}
