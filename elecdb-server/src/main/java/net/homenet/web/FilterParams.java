package net.homenet.web;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * @author denbilyk
 *         Created: 5/31/16
 */
@EqualsAndHashCode
public class FilterParams {

    @Getter
    @Setter
    private boolean partNumber;

    @Getter
    @Setter
    private boolean category;



}
