package net.homenet.service.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import net.homenet.dao.entity.HeaderRecord;

import java.io.Serializable;
import java.util.Objects;

/**
 * @author denbilyk
 *         Created: 6/16/16
 */
@EqualsAndHashCode
public class HeaderDto implements Serializable, Comparable<HeaderDto> {
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

    public HeaderDto(HeaderRecord record) {
        this.id = record.getId();
        this.name = record.getName();
        this.show = record.getShow();
    }

    @Override
    public int compareTo(HeaderDto o) {
        return this.getId() > o.getId() ? 1 : Objects.equals(this.getId(), o.getId()) ? 0 : -1;
    }
}
