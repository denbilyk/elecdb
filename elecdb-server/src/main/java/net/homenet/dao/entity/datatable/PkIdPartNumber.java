package net.homenet.dao.entity.datatable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * @author denbilyk
 *         Created: 5/31/16
 */
@EqualsAndHashCode
public class PkIdPartNumber implements Serializable {

    @Getter
    @Setter
    private Long id;
    @Getter
    @Setter
    private String partNumber;

    public PkIdPartNumber(Long id, String partNumber) {
        this.id = id;
        this.partNumber = partNumber;
    }
}
