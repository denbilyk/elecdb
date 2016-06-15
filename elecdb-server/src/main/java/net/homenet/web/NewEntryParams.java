package net.homenet.web;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * @author denbilyk
 *         Created: 5/31/16
 */
@EqualsAndHashCode
public class NewEntryParams {

    @Getter
    @Setter
    private String part;
    @Getter
    @Setter
    private String description;
    @Getter
    @Setter
    private Integer category;
    @Getter
    @Setter
    private String properties;
    @Getter
    @Setter
    private Integer quantity;
    @Getter
    @Setter
    private String symbol;
    @Getter
    @Setter
    private String footprint;
}
