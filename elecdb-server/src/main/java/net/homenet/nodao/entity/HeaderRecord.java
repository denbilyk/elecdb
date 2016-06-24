package net.homenet.nodao.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.Objects;

/**
 * @author denbilyk
 *         Created: 6/22/16
 */
public class HeaderRecord implements Serializable, Comparable<HeaderRecord> {

    @Getter
    @Setter
    @Id
    private Integer id;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private Boolean show;


    public HeaderRecord() {
    }

    public HeaderRecord(Integer id, String name, Boolean show) {
        this.id = id;
        this.name = name;
        this.show = show;
    }

    @Override
    public int compareTo(HeaderRecord o) {
        return this.getId() > o.getId() ? 1 : Objects.equals(this.getId(), o.getId()) ? 0 : -1;
    }
}
