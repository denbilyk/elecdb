package net.homenet.service.dto.datatable;

import lombok.Getter;

import java.io.Serializable;

/**
 * @author denbilyk
 *         Created: 6/16/16
 */
public class HeaderDto implements Serializable {
    @Getter
    private Integer id;
    @Getter
    private String name;
    @Getter
    private Boolean show;

    public HeaderDto(Integer id, String name, Boolean show) {
        this.id = id;
        this.name = name;
        this.show = show;
    }
}
