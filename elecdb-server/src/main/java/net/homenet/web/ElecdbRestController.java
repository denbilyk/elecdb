package net.homenet.web;

import net.homenet.dao.entity.datatable.DataTableRecord;
import net.homenet.dao.util.DataTableRecordBuilder;
import net.homenet.dao.repository.IDataTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.core.Response;
import java.util.List;

/**
 * @author denbilyk
 * Created: 5/26/16
 */

@RestController
@RequestMapping("/")
public class ElecdbRestController {

    @Autowired
    IDataTableRepository altiumTableRepository;

    @RequestMapping(method = RequestMethod.GET)
    public String list() {

        List<DataTableRecord> irfz44 = altiumTableRepository.findAll();
        return irfz44.toString();
    }

}
