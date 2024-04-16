package OSSP214.taxmap.models;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ViewRange {
    private float min_lng;
    private float max_lng;
    private float min_lat;
    private float max_lat;
}
