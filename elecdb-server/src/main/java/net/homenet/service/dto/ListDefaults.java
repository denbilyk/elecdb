package net.homenet.service.dto;

import lombok.Getter;
import lombok.Setter;
import net.homenet.dao.entity.datatable.DataTableRecord;

import java.io.Serializable;

/**
 * @author denbilyk
 *         Created: 5/31/16
 */
public class ListDefaults implements Serializable {

    @Getter
    @Setter
    private String part;
    @Getter
    @Setter
    private CategoryRecordDto category;
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
    private String symbol;
    @Getter
    @Setter
    private String footprint;


    public ListDefaults(DataTableRecord record) {
        this.setPart(record.getPartNumber());
        this.setCategory(new CategoryRecordDto(record.getCategory()));
        this.setDescription(record.getDescription());
        this.setProperties(record.getProperties());
        this.setQuantity(record.getQuantity());
        this.setSymbol(record.getSymbol());
        this.setFootprint(record.getFootprint());
    }
}
