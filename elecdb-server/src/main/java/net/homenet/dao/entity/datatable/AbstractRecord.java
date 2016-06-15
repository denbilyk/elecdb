package net.homenet.dao.entity.datatable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import net.homenet.dao.entity.DomainObject;

import javax.persistence.*;

/**
 * @author denbilyk
 *         Created: 5/26/16
 */

@EqualsAndHashCode(exclude = {
        "pathRecord"
})
@Entity
@Table(name = "data_table", uniqueConstraints = {
        @UniqueConstraint(columnNames = "partNumber")
})
public abstract class AbstractRecord implements DomainObject {

    @Getter
    @Setter
    @Id
    private String partNumber;

    @Getter
    @Setter
    private Long published;

    @Getter
    @Setter
    private String symbol;

    @Getter
    @Setter
    private String footprint;

    @Getter
    @Setter
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "abstractRecord")
    private AltiumPathRecord pathRecord;

    public AbstractRecord(String partNumber) {
        this.partNumber = partNumber;
    }

    public AbstractRecord() {
    }
}
