package net.homenet.dao.entity.datatable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import net.homenet.dao.entity.CategoryRecord;

import javax.persistence.*;

/**
 * @author denbilyk
 * Created: 5/26/16
 */
@EqualsAndHashCode(callSuper = true)
@Entity
public class DataTableRecord extends AbstractRecord {

    @Setter
    @Getter
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id")
    private CategoryRecord category;

    @Getter
    @Setter
    private String description;

    @Getter
    @Setter
    private String properties;

    @Getter
    @Setter
    private Integer quantity;

    @Getter
    @Setter
    private String value;

    @Getter
    @Setter
    private String voltage;

    @Getter
    @Setter
    private String power;

    @Getter
    @Setter
    private String tolerance;

    public DataTableRecord(String partNumber) {
        super(partNumber);
    }

    public DataTableRecord() {
    }
}
