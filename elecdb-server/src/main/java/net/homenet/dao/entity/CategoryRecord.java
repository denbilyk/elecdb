package net.homenet.dao.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * @author denbilyk
 *         Created: 5/31/16
 */
@EqualsAndHashCode(exclude = {
        "id", "dataTableRecord"
})
@Entity
@Table(name = "def_category", uniqueConstraints = {
        @UniqueConstraint(columnNames = "category")
})

public class CategoryRecord implements Serializable {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Getter
    @Setter
    private String category;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "category")
    @Setter
    @Getter
    private Set<DataTableRecord> dataTableRecord;


    public CategoryRecord() {
    }

    public CategoryRecord(Integer id, String category) {
        this.id = id;
        this.category = category;
    }
}
