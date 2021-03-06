package net.homenet.service;

import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import lombok.extern.slf4j.Slf4j;
import net.homenet.config.HeaderConstants;
import net.homenet.dao.entity.CategoryRecord;
import net.homenet.dao.entity.DataTableRecord;
import net.homenet.dao.entity.HeaderRecord;
import net.homenet.dao.repository.IDataTableRepository;
import net.homenet.dao.util.OperationResult;
import net.homenet.service.dto.DetailsDto;
import net.homenet.service.dto.HeaderDto;
import net.homenet.web.DetailsParams;
import net.homenet.web.EntryParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

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


    public List<List<Object>> loadDataByHeaderIds(List<Integer> categoryIds, String... ids) {
        List<Integer> srcIds = Arrays.stream(ids).mapToInt(Integer::parseInt).boxed().collect(Collectors.toList());
        List<DataTableRecord> all = dataTableRepository.findAll(new Sort("partNumber"));
        List<Object> row;
        List<List<Object>> data = new ArrayList<>();
        for (DataTableRecord record : all) {
            if (categoryIds != null && !categoryIds.contains(record.getCategory().getId())) continue;
            row = Lists.newArrayList();
            for (Integer id : srcIds) {
                row.add(record.getValueByHeaderId(id, headerService.getDataTypeById(id)));
            }
            data.add(row);
        }
        return data;
    }

    public OperationResult newRecord(EntryParams params) {
        DataTableRecord record = new DataTableRecord(params.getPart());
        record.setCategory(categoryService.byId(params.getCategory()));
        record.setQuantity(params.getQuantity());

        if (params.getAddFields() != null) {
            for (Map map : params.getAddFields()) {
                Object value = map.get("value");
                if (value == null) continue;
                record.addField(String.valueOf(value), headerService.byId((Integer) map.get("id")).getId());
            }
        }
        return save(record);
    }

    private OperationResult save(DataTableRecord record) {
        if (dataTableRepository.exists(Example.of(new DataTableRecord(record.getPartNumber()))))
            return OperationResult.status(OperationResult.OperationStatus.ENTRY_EXISTS).text(record.getPartNumber());
        return update(record);
    }

    private OperationResult update(DataTableRecord record) {
        if (record.getPartNumber() == null || record.getPartNumber().isEmpty())
            return OperationResult.status(OperationResult.OperationStatus.MISS_PART);
        dataTableRepository.save(record);
        return OperationResult.status(OperationResult.OperationStatus.SAVED).text(record.getPartNumber());
    }


    public Collection<OperationResult> processImport(Collection<List<Map>> data) {
        Collection<OperationResult> results = new ArrayList<>();
        for (List<Map> row : data) {
            DataTableRecord record = new DataTableRecord();
            boolean valid = true;
            for (Map map : row) {
                Object value = map.get("value");
                if (value == null) continue;
                HeaderRecord headerRecord = headerService.byId((Integer) map.get("id"));
                if (headerRecord.getId() == HeaderConstants.PARTNUMBER.getId()) {
                    record.setPartNumber(String.valueOf(value));
                    continue;
                }
                if (headerRecord.getId() == HeaderConstants.CATEGORY.getId()) {
                    CategoryRecord categoryRecord = categoryService.getCategoryRecordByName(String.valueOf(value));
                    if (categoryRecord == null) {
                        results.add(OperationResult.status(OperationResult.OperationStatus.NO_CATEGORY).text(String.valueOf(value)));
                        valid = false;
                        break;
                    }
                    record.setCategory(categoryRecord);
                    continue;
                }
                if (headerRecord.getId() == HeaderConstants.QUANTITY.getId()) {
                    if (value instanceof Integer)
                        record.setQuantity((Integer) value);
                    else {
                        results.add(OperationResult.status(OperationResult.OperationStatus.QUANTITY_FORMAT).text(String.valueOf(value)));
                        valid = false;
                    }
                    continue;
                }

                String date = checkDate(value);
                record.addField(date == null ? String.valueOf(value) : date, headerRecord.getId());
            }
            if (valid)
                results.add(save(record));
        }
        return results;
    }


    private String checkDate(Object value) {
        String[] formatStrings = {"MM-dd-yyyy HH:mm:ss", "MM/dd/yyyy HH:mm:ss"};
        String dateString = String.valueOf(value);
        for (String formatString : formatStrings) {
            try {
                SimpleDateFormat sdf = new SimpleDateFormat(formatString);
                Date date = sdf.parse(dateString);
                sdf.applyPattern("dd-MM-yyyy");
                return sdf.format(date);
            } catch (ParseException e) {
            }
        }
        return null;
    }

    public Collection<HeaderDto> header() {
        List<HeaderDto> headerDtos = Lists.transform(headerService.list(), HeaderDto::new);
        TreeSet<HeaderDto> set = Sets.newTreeSet();
        set.addAll(headerDtos);
        return set;
    }

    public Collection<DetailsDto> details(String partNumber) {
        DataTableRecord record = dataTableRepository.findOne(partNumber);
        if (record == null) return Collections.emptyList();
        List<DetailsDto> detailsDtos = Lists.transform(headerService.list(), header -> new DetailsDto(header.getId(), header.getName(), record.getValueByHeaderId(header.getId(), header.getDataType())));
        TreeSet<DetailsDto> set = Sets.newTreeSet();
        set.addAll(detailsDtos);
        return set;
    }

    public OperationResult updateRecord(DetailsParams params) {
        String partNumber = params.getPartNumber();
        if (partNumber == null || partNumber.isEmpty())
            return OperationResult.status(OperationResult.OperationStatus.MISS_PART);
        DataTableRecord record = dataTableRepository.findOne(partNumber);
        if (record == null)
            return OperationResult.status(OperationResult.OperationStatus.ENTRY_NOT_FOUND).text(partNumber);
        for (Map map : params.getFields()) {
            Object value = map.get("value");
            if (value == null) continue;
            Integer headerId = headerService.byId((Integer) map.get("id")).getId();
            if (HeaderConstants.PARTNUMBER.getId() == headerId) continue;
            if (HeaderConstants.CATEGORY.getId() == headerId) continue;
            if (HeaderConstants.QUANTITY.getId() == headerId) {
                record.setQuantity(Integer.parseInt(String.valueOf(value)));
                continue;
            }
            record.addField(String.valueOf(value), headerId);
        }
        return update(record);
    }

    public OperationResult deleteRecord(String partNumber) {
        if (!dataTableRepository.exists(partNumber))
            return OperationResult.status(OperationResult.OperationStatus.ENTRY_NOT_FOUND).text(partNumber);
        dataTableRepository.delete(partNumber);
        return OperationResult.status(OperationResult.OperationStatus.DELETE_ENTRY).text(partNumber);
    }
}
