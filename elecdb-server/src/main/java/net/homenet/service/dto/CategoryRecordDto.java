package net.homenet.service.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import net.homenet.dao.entity.CategoryRecord;

import java.io.Serializable;

/**
 * @author denbilyk
 *         Created: 5/31/16
 */
@EqualsAndHashCode
public class CategoryRecordDto implements Serializable {

    @Getter
    private Long id;
    @Getter
    private String name;

    public CategoryRecordDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public CategoryRecordDto(CategoryRecord category) {
        this.id = category.getId();
        this.name = category.getCategory();
    }
}
