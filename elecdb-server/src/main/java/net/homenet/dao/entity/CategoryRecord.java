package net.homenet.dao.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import net.homenet.dao.entity.datatable.DataTableRecord;

import javax.persistence.*;
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

public class CategoryRecord {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Getter
    @Setter
    private String category;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "category")
    @Setter
    @Getter
    private Set<DataTableRecord> dataTableRecord;

}
