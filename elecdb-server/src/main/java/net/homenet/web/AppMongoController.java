package net.homenet.web;

import lombok.extern.slf4j.Slf4j;
import net.homenet.dao.util.OperationResult;
import net.homenet.nodao.entity.CategoryRecord;
import net.homenet.nodao.entity.HeaderRecord;
import net.homenet.nodao.entity.RecordField;
import net.homenet.nodao.repository.ICategoryMongoRepository;
import net.homenet.nodao.service.CategoryMongoService;
import net.homenet.nodao.service.DataMongoService;
import net.homenet.nodao.service.HeaderMongoService;
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
import java.util.TreeSet;

/**
 * @author denbilyk
 *         Created: 6/22/16
 */

@RestController
@RequestMapping(value = "/mongo")
@CrossOrigin(origins = "*")
@Slf4j
public class AppMongoController {
    @Autowired
    private HeaderMongoService headerMongoService;

    @Autowired
    private DataMongoService dataMongoService;

    @Autowired
    private CategoryMongoService categoryMongoService;

    @Autowired
    ICategoryMongoRepository categoryMongoRepository;

    @RequestMapping(value = "/header")
    public Collection<HeaderRecord> headers() {
        return headerMongoService.list();
    }

    @RequestMapping(value = "/category")
    public Collection<CategoryRecord> categories() {
        return categoryMongoService.list();
    }

    @RequestMapping(value = "/data")
    public List<TreeSet<RecordField>> data(@RequestParam(name = "header_ids", required = false) String headerIds) {
        if (headerIds == null) return Collections.emptyList();
        String[] ids = headerIds.split(",");
        return dataMongoService.loadDataByHeaderIds(ids);
    }

    @RequestMapping(value = "/data", method = RequestMethod.POST)
    public ResponseEntity<OperationResult> saveOne(@RequestBody EntryParams body) {
        OperationResult operationResult = dataMongoService.saveOne(body);
        return ResponseEntity.ok(operationResult);
    }

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
                Collection<OperationResult> operationResults = dataMongoService.processImport(array);
                return ResponseEntity.ok(operationResults);
            }
        } catch (IOException e) {
            log.error("Can not get reader from request!", e);
        }
        return ResponseEntity.ok(Collections.singletonList(OperationResult.status(OperationResult.OperationStatus.IMPORT_FAILED)));
    }
}
