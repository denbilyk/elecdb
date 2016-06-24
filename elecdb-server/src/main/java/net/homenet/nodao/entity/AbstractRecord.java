package net.homenet.nodao.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.springframework.data.annotation.Id;


/**
 * @author denbilyk
 *         Created: 6/22/16
 */
@EqualsAndHashCode
public abstract class AbstractRecord {

    @Id
    @Getter
    private RecordField partNumber;

    public AbstractRecord(RecordField partNumber) {
        this.partNumber = partNumber;
    }
}
