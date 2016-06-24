package net.homenet.nodao.entity;

import lombok.Getter;
import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.Objects;

/**
 * @author denbilyk
 *         Created: 6/23/16
 */
public class CategoryRecord implements Serializable, Comparable<CategoryRecord> {

    @Id
    @Getter
    private Integer id;
    @Getter
    private String name;


    public CategoryRecord(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public int compareTo(CategoryRecord o) {
        return this.getId() > o.getId() ? 1 : Objects.equals(this.getId(), o.getId()) ? 0 : -1;
    }
}
