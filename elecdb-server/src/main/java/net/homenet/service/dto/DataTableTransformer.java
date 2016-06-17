package net.homenet.service.dto;

import net.homenet.dao.entity.HeaderRecord;
import net.homenet.dao.entity.datatable.AltiumPathRecord;
import net.homenet.dao.entity.datatable.DataTableRecord;
import net.homenet.service.dto.datatable.DataCol;
import net.homenet.service.dto.datatable.NonHeader;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author denbilyk
 *         Created: 6/15/16
 */
public final class DataTableTransformer implements Serializable {
    private static final SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");

    private DataTableTransformer(){}

    public static Collection<List<DataCol>> transform(List<DataTableRecord> dataTableRecord, Map<String, HeaderRecord> headerMap) {
        Collection<List<DataCol>> rows = new ArrayList<>();
        List<DataCol> row;

        Set<Field> dataTableFields = new HashSet<>();
        Set<Field> pathFields = new HashSet<>();
        Class clazz = DataTableRecord.class;
        Collections.addAll(dataTableFields, clazz.getDeclaredFields());
        Collections.addAll(dataTableFields, clazz.getSuperclass().getDeclaredFields());

        for (DataTableRecord record : dataTableRecord) {
            row = new ArrayList<>();
            checkFields(headerMap, row, record, dataTableFields);

            AltiumPathRecord pathRecord = record.getPathRecord();
            Collections.addAll(pathFields, AltiumPathRecord.class.getDeclaredFields());
            checkFields(headerMap, row, pathRecord, pathFields);

            String category = record.getCategory().getCategory();
            Integer id = headerMap.get("category").getId();
            row.add(new DataCol(id, category));
            rows.add(row);

        }
        return rows;
    }

    private static void checkFields(Map<String, HeaderRecord> headerMap, List<DataCol> row, Object object, Set<Field> fields) {
        for (Field field : fields) {
            if (field.isAnnotationPresent(NonHeader.class)) continue;
            if (headerMap.containsKey(field.getName().toLowerCase())) {
                field.setAccessible(true);
                Object value;
                try {
                    value = field.get(object);
                    if (field.getName().equals("published"))
                        value = sdf.format(new Date((Long) value));

                } catch (IllegalAccessException e) {
                    continue;
                }
                Integer id = headerMap.get(field.getName().toLowerCase()).getId();
                row.add(new DataCol(id, value));
            }
        }
    }
}
