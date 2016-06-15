package net.homenet.web;

import net.homenet.service.CategoryService;
import net.homenet.service.dto.CategoryRecordDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

/**
 * @author denbilyk
 *         Created: 5/31/16
 */

@RestController
@RequestMapping("/defs")
public class DefaultsController {

    @Autowired
    private CategoryService categoryService;

    @CrossOrigin(origins = "http://localhost:9001")
    @RequestMapping("/category")
    @ResponseBody
    public Collection<CategoryRecordDto> getCategories() {
        return categoryService.getCategories();
    }
}
