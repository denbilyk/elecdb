package net.homenet.web;

import lombok.extern.slf4j.Slf4j;
import net.homenet.dao.util.OperationResult;
import net.homenet.service.CategoryService;
import net.homenet.service.DataTableService;
import net.homenet.service.dto.datatable.DataCol;
import net.homenet.service.dto.datatable.HeaderDto;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * @author denbilyk
 *         Created: 5/31/16
 */

@RestController
@RequestMapping("/data")
@Slf4j
public class DataTableRestController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private DataTableService dataTableService;

    @CrossOrigin(origins = "http://localhost:9001")
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public Collection<List<DataCol>> list() {
        return dataTableService.listDefault(1);
    }

    @CrossOrigin(origins = "http://localhost:9001")
    @RequestMapping(value = "/header", method = RequestMethod.GET)
    @ResponseBody
    public Collection<HeaderDto> header() {
        return dataTableService.header();
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<OperationResult> addNewEntry(@RequestBody NewEntryParams body) {
        OperationResult operationResult = dataTableService.addNewRecord(body);
        return ResponseEntity.ok(operationResult);
    }


    @CrossOrigin(origins = "*")
    @ResponseBody
    @RequestMapping(value = "/import", method = RequestMethod.POST, headers = {"content-type=application/json"})
    public ResponseEntity<Collection<OperationResult>> saveData(HttpServletRequest request,
                                                                HttpServletResponse response, Model model) {
        try {
            BufferedReader reader = request.getReader();
            StringBuilder jsonItems = new StringBuilder();
            String buffer;
            while ((buffer = reader.readLine()) != null) {
                jsonItems.append(buffer);
            }
            JSONArray array = new JSONObject(jsonItems.toString()).getJSONArray("items");
            if (array != null) {
                Collection<OperationResult> operationResults = dataTableService.processImport(array);
                return ResponseEntity.ok(operationResults);
            }
        } catch (IOException e) {
            log.error("Can not get reader from request!", e);
        }
        return ResponseEntity.ok(Collections.singletonList(OperationResult.status(OperationResult.OperationStatus.IMPORT_FAILED)));
    }
}
