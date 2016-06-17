package net.homenet.service.dto.datatable;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.io.Serializable;

/**
 * @author denbilyk
 *         Created: 6/16/16
 */
public class DataCol implements Serializable {
    @Getter
    @JsonProperty(value = "header_id")
    private Integer headerId;
    @Getter
    private Object value;

    public DataCol(Integer headerId, Object value) {
        this.headerId = headerId;
        this.value = value;
    }
}
