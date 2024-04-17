package OSSP214.taxmap.controllers;

import OSSP214.taxmap.models.Coords;
import OSSP214.taxmap.models.ViewRange;
import OSSP214.taxmap.services.CoordsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path = "/map")
public class CoordsController {
    private final CoordsService coordsService;

    public CoordsController(CoordsService coordsService) {
        this.coordsService = coordsService;
    }


    // ViewRange 안에 있는 마커들 검색
    @GetMapping(path = "/view")
    public List<Coords> getMarkers(@RequestBody ViewRange viewRange) {
        return coordsService.getByViewRange(viewRange);
    }

    // 좌표값으로 마커 검색
    @GetMapping(path = "/{latitude}/{longitude}")
    public Coords getCoords(@PathVariable double latitude, @PathVariable double longitude) {
        return coordsService.getByLatLng(latitude, longitude).orElseThrow();
    }

    // 모든 마커 검색
    @GetMapping(path = "all")
    public List<Coords> all() {
        return coordsService.getAll();
    }

    // 마커 id로 검색
    @GetMapping(path = "{id}")
    public Coords one(@PathVariable Long id) {
        return coordsService.getById(id).orElseThrow();
    }
}