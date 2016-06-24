package net.homenet.nodao.entity;

import net.homenet.dao.entity.altium.AltiumImportBean;
import net.homenet.nodao.service.CategoryMongoService;
import net.homenet.nodao.service.HeaderMongoService;

import java.lang.reflect.Field;
import java.util.Collection;
import java.util.Objects;
import java.util.Optional;

/**
 * @author denbilyk
 *         Created: 6/23/16
 */

public final class DataTableRecordBuilder {
    private DataTableRecord record;

    private DataTableRecordBuilder(AltiumImportBean bean, HeaderMongoService headerService, CategoryMongoService categoryService) throws IllegalAccessException {
        Collection<HeaderRecord> headerRecords = headerService.list();
        record = new DataTableRecord(new RecordField(headerService.getPkRecord().getId(), bean.getPartnumber()));
        record.setCategory(new RecordField(headerService.getCategoryRecord().getId(), categoryService.getByName(bean.getCategory()).getName()));
        record.addCell(new RecordField(headerService.getQuantityRecord().getId(), 0));

        for (Field field : AltiumImportBean.class.getDeclaredFields()) {
            field.setAccessible(true);
            String fieldName = field.getName();
            Optional<HeaderRecord> first = headerRecords.stream().filter(headerRecord -> Objects.equals(headerRecord.getName().toLowerCase().replaceAll("\\s+", ""), fieldName)).findFirst();
            if (first.isPresent()) {
                record.addCell(new RecordField(first.get().getId(), field.get(bean)));
            }
        }


    }

    public static DataTableRecordBuilder instantiate(AltiumImportBean bean, HeaderMongoService headerMongoService, CategoryMongoService categoryMongoService) throws IllegalAccessException {
        return new DataTableRecordBuilder(bean, headerMongoService, categoryMongoService);
    }

    public DataTableRecord build() {
        return record;
    }
}
