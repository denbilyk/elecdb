package net.homenet.dao.util;

import lombok.Setter;
import net.homenet.dao.entity.CategoryRecord;
import net.homenet.dao.entity.altium.AltiumImportBean;
import net.homenet.dao.entity.datatable.AltiumPathRecord;
import net.homenet.dao.entity.datatable.DataTableRecord;
import net.homenet.service.CategoryService;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author denbilyk
 *         Created: 5/27/16
 */
public class DataTableRecordBuilder {

    @Setter
    private CategoryService categoryService;

    private DataTableRecord dataTableRecord;
    private AltiumPathRecord pathRecord;
    private List<String> footRefs;

    private DataTableRecordBuilder(String partNumber, CategoryService categoryService) {
        this.categoryService = categoryService;
        dataTableRecord = new DataTableRecord();
        dataTableRecord.setPartNumber(partNumber);
        pathRecord = new AltiumPathRecord();
        pathRecord.setAbstractRecord(dataTableRecord);
        dataTableRecord.setPathRecord(pathRecord);
        footRefs = new ArrayList<>();
    }


    public static DataTableRecordBuilder instantiate(String partNumber, CategoryService categoryService) {
        return new DataTableRecordBuilder(partNumber, categoryService);
    }

    public static DataTableRecordBuilder instantiate(AltiumImportBean bean, CategoryService categoryService) throws CategoryNotFoundException, ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("MM-dd-yyyy HH:mm:ss");
        long date;
        try {
            date = sdf.parse(bean.getPublished()).getTime();
        } catch (ParseException e) {
            date = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").parse(bean.getPublished()).getTime();
        }

        DataTableRecordBuilder builder = new DataTableRecordBuilder(bean.getPartnumber(), categoryService);
        builder.withCategory(bean.getCategory());
        builder.withQuantity(0);
        builder.withValue(bean.getValue());
        builder.withVoltage(bean.getVoltage());
        builder.withPower(bean.getPower());
        builder.withTolerance(bean.getTolerance());
        builder.withDescription(bean.getDescription());
        builder.dataTableRecord.setPublished(date);
        builder.withLibraryPath(bean.getLibrarypath());
        builder.withLibraryRef(bean.getLibraryref());
        builder.withFootprintPath(bean.getFootprintpath());
        builder.withFootprintPath2(bean.getFootprintpath2());
        builder.addFootprintRef(bean.getFootprintref());
        builder.addFootprintRef(bean.getFootprintref2());
        builder.addFootprintRef(bean.getFootprintref3());
        builder.addFootprintRef(bean.getFootprintref4());
        builder.addFootprintRef(bean.getFootprintref5());
        builder.addFootprintRef(bean.getFootprintref6());
        builder.addFootprintRef(bean.getFootprintref7());
        builder.addFootprintRef(bean.getFootprintref8());
        builder.addFootprintRef(bean.getFootprintref9());
        builder.addFootprintRef(bean.getFootprintref10());
        return builder;
    }

    /**
     * Additional fields
     */

    public DataTableRecordBuilder withCategory(String category) throws CategoryNotFoundException {
        CategoryRecord categoryRecord = categoryService.getCategoryRecordByName(category);
        if (categoryRecord == null) throw new CategoryNotFoundException(category);
        dataTableRecord.setCategory(categoryRecord);
        return this;
    }

    public DataTableRecordBuilder withCategory(Long id) throws CategoryNotFoundException {
        CategoryRecord categoryRecord = categoryService.getCategoryRecordById(id);
        if (categoryRecord == null) throw new CategoryNotFoundException(id);
        dataTableRecord.setCategory(categoryRecord);
        return this;
    }


    public DataTableRecordBuilder withDescription(String description) {
        dataTableRecord.setDescription(description);
        return this;
    }


    public DataTableRecordBuilder withProperties(String properties) {
        dataTableRecord.setProperties(properties);
        return this;
    }


    public DataTableRecordBuilder withQuantity(Integer quantity) {
        dataTableRecord.setQuantity(quantity);
        return this;
    }


    public DataTableRecordBuilder withValue(String value) {
        dataTableRecord.setValue(value);
        return this;
    }

    public DataTableRecordBuilder withVoltage(String voltage) {
        dataTableRecord.setVoltage(voltage);
        return this;
    }

    public DataTableRecordBuilder withPower(String power) {
        dataTableRecord.setPower(power);
        return this;
    }

    public DataTableRecordBuilder withTolerance(String tolerance) {
        dataTableRecord.setTolerance(tolerance);
        return this;
    }


    /**
     * Refs
     */

    public DataTableRecordBuilder withLibraryRef(String libraryRef) {
        dataTableRecord.setSymbol(libraryRef);
        return this;
    }


    public DataTableRecordBuilder addFootprintRef(String footprintRef) {
        footRefs.add(footprintRef);
        return this;
    }

    /**
     * Paths
     */


    public DataTableRecordBuilder withLibraryPath(String libraryPath) {
        pathRecord.setLibraryPath(libraryPath);
        return this;
    }

    public DataTableRecordBuilder withFootprintPath(String footprintPath) {
        pathRecord.setFootprintPath(footprintPath);
        return this;
    }

    public DataTableRecordBuilder withFootprintPath2(String footprintPath) {
        pathRecord.setFootprintPath2(footprintPath);
        return this;
    }


    public DataTableRecord build() {
        try {
            dataTableRecord.setFootprint(footRefs.get(0));
            pathRecord.setFootprintRef2(footRefs.get(1));
            pathRecord.setFootprintRef3(footRefs.get(2));
            pathRecord.setFootprintRef4(footRefs.get(3));
            pathRecord.setFootprintRef5(footRefs.get(4));
            pathRecord.setFootprintRef6(footRefs.get(5));
            pathRecord.setFootprintRef7(footRefs.get(6));
            pathRecord.setFootprintRef8(footRefs.get(7));
            pathRecord.setFootprintRef9(footRefs.get(8));
        } catch (IndexOutOfBoundsException e) {

        }

        if (dataTableRecord.getPublished() == null)
            dataTableRecord.setPublished(new Date().getTime());
        return dataTableRecord;
    }
}
