package net.homenet.service.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

/**
 * @author denbilyk
 *         Created: 7/8/16
 */
@EqualsAndHashCode
public class DetailsDto implements Serializable, Comparable<DetailsDto> {

    @Getter
    @Setter
    private Integer id;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private Object value;


    public DetailsDto(Integer id, String name, Object value) {
        this.id = id;
        this.name = name;
        this.value = value;
    }

    @Override
    public int compareTo(DetailsDto o) {
        return this.getId() > o.getId() ? 1 : Objects.equals(this.getId(), o.getId()) ? 0 : -1;
    }
}
