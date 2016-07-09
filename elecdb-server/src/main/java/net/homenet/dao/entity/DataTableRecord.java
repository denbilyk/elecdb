package net.homenet.dao.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import net.homenet.config.HeaderConstants;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * @author denbilyk
 *         Created: 6/24/16
 */

@EqualsAndHashCode
@Entity
@Table(name = "data_table")
public class DataTableRecord implements Serializable {

    @Getter
    @Id
    private String partNumber;

    @Getter
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id")
    private CategoryRecord category;

    @Getter
    private Integer quantity;

    @MapKeyColumn(name = "header_id")
    @ElementCollection
    @Column(name = "value")
    @CollectionTable(name = "header_value", joinColumns = @JoinColumn(name = "part_number"))
    private Map<Integer, String> fields = new HashMap<>();


    public DataTableRecord() {
    }

    public DataTableRecord(String partNumber) {
        setPartNumber(partNumber);
    }

    public void setCategory(CategoryRecord category) {
        this.category = category;
        addField(category.getCategory(), HeaderConstants.CATEGORY.getId());
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
        addField(String.valueOf(quantity), HeaderConstants.QUANTITY.getId());
    }

    public void setPartNumber(String partNumber) {
        this.partNumber = partNumber;
        addField(partNumber, HeaderConstants.PARTNUMBER.getId());
    }

    @Transient
    public void addField(String value, int headerId) {
        fields.put(headerId, value);
    }

    @Transient
    public Object getValueByHeaderId(Integer id, String className) {
        String value = fields.get(id);
        if (value == null) return "";
        if (className.equals(String.class.getName())) return value;
        return net.homenet.dao.util.Converter.get(className, value).value();
    }

    @Transient
    @PreRemove
    public void preRemove() {
        this.fields.clear();
        this.category = null;
    }
}
