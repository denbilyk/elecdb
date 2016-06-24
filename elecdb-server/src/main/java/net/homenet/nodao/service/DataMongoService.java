package net.homenet.nodao.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Collections2;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import lombok.extern.slf4j.Slf4j;
import net.homenet.dao.entity.altium.AltiumImportBean;
import net.homenet.dao.util.OperationResult;
import net.homenet.nodao.entity.CategoryRecord;
import net.homenet.nodao.entity.DataTableRecord;
import net.homenet.nodao.entity.DataTableRecordBuilder;
import net.homenet.nodao.entity.RecordField;
import net.homenet.nodao.repository.IDataTableMongoRepository;
import net.homenet.web.EntryParams;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author denbilyk
 *         Created: 6/22/16
 */
@Service
@Slf4j
public class DataMongoService {

    @Autowired
    private IDataTableMongoRepository dataTableMongoRepository;

    @Autowired
    private HeaderMongoService headerMongoService;

    @Autowired
    private CategoryMongoService categoryMongoService;


    public List<TreeSet<RecordField>> loadDataByHeaderIds(String... ids) {
        List<Integer> srcIds = Arrays.stream(ids).mapToInt(Integer::parseInt).boxed().collect(Collectors.toList());
        List<Integer> idsList;
        List<DataTableRecord> dataRecords = dataTableMongoRepository.findAll();
        TreeSet<RecordField> row;
        ArrayList<TreeSet<RecordField>> data = Lists.newArrayList();

        for (DataTableRecord dataRecord : dataRecords) {
            row = Sets.newTreeSet();
            idsList = new ArrayList<>(srcIds);
            Integer headerId = dataRecord.getPartNumber().getHeaderId();
            if (idsList.contains(headerId)) {
                row.add(dataRecord.getPartNumber());
                idsList.remove(headerId);
            }
            headerId = dataRecord.getCategory().getHeaderId();
            if (idsList.contains(headerId)) {
                row.add(dataRecord.getCategory());
                idsList.remove(headerId);
            }

            Iterator<RecordField> iterator = dataRecord.getCells().iterator();
            while (iterator.hasNext()) {
                headerId = iterator.next().getHeaderId();
                if (!idsList.contains(headerId))
                    iterator.remove();
                else idsList.remove(headerId);
            }
            row.addAll(dataRecord.getCells());
            row.addAll(idsList.stream().map(id -> new RecordField(id, "")).collect(Collectors.toList()));
            data.add(row);
        }
        return data;

    }


    public OperationResult saveOne(EntryParams params) {
        DataTableRecord record = new DataTableRecord(new RecordField(headerMongoService.getPkRecord().getId(), params.getPart()));

        CategoryRecord categoryRecord = categoryMongoService.getById(params.getCategory());
        RecordField field = new RecordField(headerMongoService.getCategoryRecord().getId(), categoryRecord.getName());
        record.setCategory(field);

        field = new RecordField(headerMongoService.getQuantityRecord().getId(), params.getQuantity());
        record.addCell(field);

        if (params.getAddFields() != null) {
            for (Map map : params.getAddFields()) {
                Object value = map.get("value");
                if (value == null) continue;
                record.addCell(new RecordField(headerMongoService.byId((Integer) map.get("id")).getId(), value));
            }
        }
        return save(record);
    }


    private OperationResult save(DataTableRecord record) {
        if (dataTableMongoRepository.exists(record.getPartNumber()))
            return OperationResult.status(OperationResult.OperationStatus.ENTRY_EXISTS).text((String) record.getPartNumber().getValue());
        return update(record);
    }

    private OperationResult update(DataTableRecord record) {
        if (record.getPartNumber() == null) return OperationResult.status(OperationResult.OperationStatus.MISS_PART);
        dataTableMongoRepository.save(record);
        return OperationResult.status(OperationResult.OperationStatus.SAVED).text(record.getPartNumber().toString());
    }

    public Collection<OperationResult> processImport(JSONArray array) {
        ObjectMapper mapper = new ObjectMapper();
        Collection<OperationResult> results = new ArrayList<>();
        for (int i = 0; i < array.length(); i++) {
            JSONObject object = array.getJSONObject(i);
            try {
                AltiumImportBean bean = mapper.readValue(object.toString(), AltiumImportBean.class);
                DataTableRecordBuilder builder = DataTableRecordBuilder.instantiate(bean, headerMongoService, categoryMongoService);
                DataTableRecord record = builder.build();
                results.add(save(record));
            } catch (IOException e) {
                log.warn("Can not serialize json: " + object.toString());
            } catch (IllegalAccessException e) {

            }
        }
        return results;
    }
}
