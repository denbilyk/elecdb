package net.homenet.web;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

/**
 * @author denbilyk
 *         Created: 7/8/16
 */
@EqualsAndHashCode
public class DetailsParams {

    @Getter
    @Setter
    private String partNumber;
    @Getter
    @Setter
    private List<Map> fields;

}
