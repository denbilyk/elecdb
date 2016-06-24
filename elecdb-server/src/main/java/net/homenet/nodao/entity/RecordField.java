package net.homenet.nodao.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

/**
 * @author denbilyk
 *         Created: 6/22/16
 */
@EqualsAndHashCode
public class RecordField implements Serializable, Comparable<RecordField> {

    @Getter
    @Setter
    private Integer headerId;

    @Getter
    @Setter
    private Object value;


    public RecordField() {
    }

    public RecordField(Integer headerId, Object value) {
        this.headerId = headerId;
        this.value = value;
    }

    @Override
    public int compareTo(RecordField o) {
        return this.getHeaderId() > o.getHeaderId() ? 1 : Objects.equals(this.getHeaderId(), o.getHeaderId()) ? 0 : -1;
    }

    @Override
    public String toString() {
        return String.valueOf(value);
    }
}
