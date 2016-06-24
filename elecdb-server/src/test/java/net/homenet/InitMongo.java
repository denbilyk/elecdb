package net.homenet;

import net.homenet.nodao.entity.CategoryRecord;
import net.homenet.nodao.entity.HeaderRecord;

import java.util.ArrayList;
import java.util.List;

/**
 * @author denbilyk
 *         Created: 6/22/16
 */
public class InitMongo {


public void setHeaders() {
    List<HeaderRecord> items = new ArrayList<>();
    items.add(new HeaderRecord(1, "Part Number", true));
    items.add(new HeaderRecord(2, "Category", true));
    items.add(new HeaderRecord(3, "Description", true));
    items.add(new HeaderRecord(4, "Properties", true));
    items.add(new HeaderRecord(5, "Quantity", true));
    items.add(new HeaderRecord(6, "Symbol", true));
    items.add(new HeaderRecord(7, "Footprint", true));
    items.add(new HeaderRecord(8, "Published", false));
    items.add(new HeaderRecord(9, "Footprint Path", false));
    items.add(new HeaderRecord(10, "Footprint Ref2", false));
    items.add(new HeaderRecord(11, "Footprint Ref3", false));
    items.add(new HeaderRecord(12, "Footprint Ref4", false));
    items.add(new HeaderRecord(13, "Library Path", false));
    items.add(new HeaderRecord(14, "Footprint Path2", false));
    items.add(new HeaderRecord(15, "Power", false));
    items.add(new HeaderRecord(16, "Tolerance", false));
    items.add(new HeaderRecord(17, "Value", false));
    items.add(new HeaderRecord(18, "Voltage", false));
    items.add(new HeaderRecord(19, "Footprint Ref5", false));
    items.add(new HeaderRecord(20, "Footprint Ref6", false));
    items.add(new HeaderRecord(21, "Footprint Ref7", false));
    items.add(new HeaderRecord(22, "Footprint Ref8", false));
    items.add(new HeaderRecord(23, "Footprint Ref9", false));


    List<CategoryRecord> list = new ArrayList<>();
    list.add(new CategoryRecord(1, "Active"));
    list.add(new CategoryRecord(2, "Connectors"));
    list.add(new CategoryRecord(3, "ICs"));
    list.add(new CategoryRecord(4, "General"));
}

}
