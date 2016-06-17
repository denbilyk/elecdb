package net.homenet.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Collections2;
import lombok.extern.slf4j.Slf4j;
import net.homenet.dao.entity.CategoryRecord;
import net.homenet.dao.entity.altium.AltiumImportBean;
import net.homenet.dao.entity.datatable.DataTableRecord;
import net.homenet.dao.repository.IDataTableRepository;
import net.homenet.dao.util.CategoryNotFoundException;
import net.homenet.dao.util.DataTableRecordBuilder;
import net.homenet.dao.util.OperationResult;
import net.homenet.service.dto.DataTableTransformer;
import net.homenet.service.dto.datatable.DataCol;
import net.homenet.service.dto.datatable.HeaderDto;
import net.homenet.web.NewEntryParams;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * @author denbilyk
 *         Created: 5/31/16
 */
@Service
@Slf4j
public class DataTableService {

    @Autowired
    private IDataTableRepository dataTableRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private HeaderService headerService;


    public Collection<List<DataCol>> listDefault(int amount) {
        List<DataTableRecord> all = dataTableRepository.findAll();
        return DataTableTransformer.transform(all, headerService.getHeaderRecordMap());
    }

    public OperationResult addNewRecord(NewEntryParams params) {
        try {
            DataTableRecord record = DataTableRecordBuilder.instantiate(params.getPart(), categoryService)
                    .withCategory((long) params.getCategory())
                    .withDescription(params.getDescription())
                    .withProperties(params.getProperties())
                    .withQuantity(params.getQuantity())
                    .withLibraryRef(params.getSymbol())
                    .addFootprintRef(params.getFootprint()).build();
            return save(record);
        } catch (CategoryNotFoundException e) {
            log.debug(e.getMessage(), e);
            return OperationResult.status(OperationResult.OperationStatus.NO_CATEGORY).text(e.getMessage());
        }
    }

    private OperationResult save(DataTableRecord record) {
        if (dataTableRepository.exists(Example.of(new DataTableRecord(record.getPartNumber()))))
            return OperationResult.status(OperationResult.OperationStatus.ENTRY_EXISTS).text(record.getPartNumber());
        return update(record);
    }

    private OperationResult update(DataTableRecord record) {
        if (record.getPartNumber() == null) return OperationResult.status(OperationResult.OperationStatus.MISS_PART);
        dataTableRepository.save(record);
        return OperationResult.status(OperationResult.OperationStatus.SAVED).text(record.getPartNumber());
    }


    private void updateCategory(DataTableRecord exists, long category) throws CategoryNotFoundException {
        if (exists.getCategory().getId() == category) return;
        CategoryRecord categoryRecord = categoryService.getCategoryRecordById(category);
        if (categoryRecord == null) throw new CategoryNotFoundException(category);
        exists.setCategory(categoryRecord);
    }

    public Collection<OperationResult> processImport(JSONArray array) {
        ObjectMapper mapper = new ObjectMapper();
        Collection<OperationResult> results = new ArrayList<>();
        for (int i = 0; i < array.length(); i++) {
            JSONObject object = array.getJSONObject(i);
            try {
                AltiumImportBean bean = mapper.readValue(object.toString(), AltiumImportBean.class);
                DataTableRecordBuilder builder = DataTableRecordBuilder.instantiate(bean, categoryService);
                DataTableRecord record = builder.build();
                results.add(save(record));
            } catch (IOException e) {
                log.warn("Can not serialize json: " + object.toString());
            } catch (CategoryNotFoundException e) {
                log.debug(e.getMessage(), e);
                results.add(OperationResult.status(OperationResult.OperationStatus.IMPORT_FAILED).text(e.getMessage()));
            } catch (ParseException e) {
                log.debug("Published date wrong format!", e);
                results.add(OperationResult.status(OperationResult.OperationStatus.IMPORT_FAILED).text("Published date wrong format!"));
            }
        }
        return results;
    }

    public Collection<HeaderDto> header() {
        return Collections2.transform(headerService.list(), header -> new HeaderDto(header.getId(), header.getName(), header.getShow()));
    }
}
