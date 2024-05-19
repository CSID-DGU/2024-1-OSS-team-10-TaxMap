package OSSP214.taxmap.models;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ViewRange {
    private double minLat;
    private double maxLat;
    private double minLng;
    private double maxLng;
    private String govOfficeFilter;

    @Override
    public String toString() {
        return "Lat: " + minLat + "~" + maxLat + " Lng: " + minLng + "~" + maxLng + ", filter: " + govOfficeFilter;
    }
}
