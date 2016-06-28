package net.homenet.web;

import lombok.extern.slf4j.Slf4j;
import net.homenet.dao.util.OperationResult;
import net.homenet.service.CategoryService;
import net.homenet.service.DataTableService;
import net.homenet.service.dto.CategoryRecordDto;
import net.homenet.service.dto.HeaderDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

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
    public Collection<List<Object>> list(@RequestParam(name = "header_ids", required = false) String headerIds) {
        if (headerIds == null)
            return Collections.emptyList();
        else {
            String[] ids = headerIds.split(",");
            return dataTableService.loadDataByHeaderIds(ids);
        }
    }

    @RequestMapping(value = "/header", method = RequestMethod.GET)
    @ResponseBody
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
}
