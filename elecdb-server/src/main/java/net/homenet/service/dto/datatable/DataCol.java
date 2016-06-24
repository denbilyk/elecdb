package net.homenet.service.dto.datatable;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.io.Serializable;
import java.util.Objects;

/**
 * @author denbilyk
 *         Created: 6/16/16
 */
public class DataCol implements Serializable, Comparable<DataCol> {
    @Getter
    @JsonProperty(value = "header_id")
    private Integer headerId;
    @Getter
    private Object value;

    public DataCol(Integer headerId, Object value) {
        this.headerId = headerId;
        this.value = value;
    }

    @Override
    public int compareTo(DataCol o) {
        return this.getHeaderId() > o.getHeaderId() ? 1 : Objects.equals(this.getHeaderId(), o.getHeaderId()) ? 0 : -1;
    }
}
