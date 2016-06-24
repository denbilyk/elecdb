package net.homenet.nodao.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Collection;

/**
 * @author denbilyk
 *         Created: 6/22/16
 */

@EqualsAndHashCode(callSuper = true)
public class DataTableRecord extends AbstractRecord {


    @Getter
    @Setter
    private RecordField category;


    @Getter
    private Collection<RecordField> cells;


    public DataTableRecord(RecordField partNumber) {
        super(partNumber);
        cells = new ArrayList<>();
    }


    public void addCell(RecordField cell) {
        cells.add(cell);
    }
}
