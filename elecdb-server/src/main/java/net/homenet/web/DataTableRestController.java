package net.homenet.web;

import lombok.extern.slf4j.Slf4j;
import net.homenet.dao.util.OperationResult;
import net.homenet.service.CategoryService;
import net.homenet.service.DataTableService;
import net.homenet.service.dto.CategoryRecordDto;
import net.homenet.service.dto.DetailsDto;
import net.homenet.service.dto.HeaderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @author denbilyk
 *         Created: 5/31/16
 */

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
@Slf4j
public class DataTableRestController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private DataTableService dataTableService;


    @RequestMapping("/category")
    @ResponseBody
    public Collection<CategoryRecordDto> getCategories() {
        return categoryService.getCategories();
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public Collection<List<Object>> list(@RequestParam(name = "header_ids", required = false) String hedIds,
                                         @RequestParam(name = "category_ids", required = false) String catIds
    ) {

        if (hedIds == null)
            return Collections.emptyList();
        String[] headerIds = hedIds.split(",");

        List<Integer> categoryIds = catIds == null || catIds.isEmpty() ? null :
                Arrays.stream(catIds.split(",")).mapToInt(Integer::parseInt).boxed().collect(Collectors.toList());

        return dataTableService.loadDataByHeaderIds(categoryIds, headerIds);
    }

    @RequestMapping(value = "/header", method = RequestMethod.GET)
    public Collection<HeaderDto> header() {
        return dataTableService.header();
    }


    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<OperationResult> addNewEntry(@RequestBody EntryParams body) {
        OperationResult operationResult = dataTableService.newRecord(body);
        return ResponseEntity.ok(operationResult);
    }

    @RequestMapping(value = "/import", method = RequestMethod.POST)
    public ResponseEntity<Collection<OperationResult>> dataImport(@RequestBody Collection<List<Map>> data) {
        Collection<OperationResult> operationResult = dataTableService.processImport(data);
        return ResponseEntity.ok(operationResult);
    }

    @RequestMapping(value = "/details", method = RequestMethod.GET)
    public Collection<DetailsDto> details(@RequestParam(name = "part") String partNumber) {
        return dataTableService.details(partNumber);
    }

    @RequestMapping(value = "/details", method = RequestMethod.PUT)
    public ResponseEntity<OperationResult> updateRecord(@RequestBody DetailsParams params) {
        OperationResult operationResult = dataTableService.updateRecord(params);
        return ResponseEntity.ok(operationResult);
    }

    @RequestMapping(value = "/{part}", method = RequestMethod.DELETE)
    public ResponseEntity<OperationResult> delete(@PathVariable("part") String partNumber) {
        OperationResult operationResult = dataTableService.deleteRecord(partNumber);
        return ResponseEntity.ok(operationResult);
    }
}
