package net.homenet.web;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

/**
 * @author denbilyk
 *         Created: 5/31/16
 */
@EqualsAndHashCode
public class EntryParams {

    @Getter
    @Setter
    private String part;
    @Getter
    @Setter
    private Integer category;
    @Getter
    @Setter
    private Integer quantity;
    @Getter
    @Setter
    private List<Map> addFields;
}
