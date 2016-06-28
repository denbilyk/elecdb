package net.homenet.service;

import com.google.common.collect.Collections2;
import net.homenet.dao.entity.CategoryRecord;
import net.homenet.dao.repository.ICategoryRepository;
import net.homenet.service.dto.CategoryRecordDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

/**
 * @author denbilyk
 *         Created: 5/31/16
 */
@Service
public class CategoryService {

    @Autowired
    private ICategoryRepository categoryRepository;


    public Collection<CategoryRecordDto> getCategories() {
        return Collections2.transform(categoryRepository.findAll(), CategoryRecordDto::new);
    }

    public CategoryRecord getCategoryRecordByName(String category) {
        return categoryRepository.findCategoryRecordByCategory(category);
    }

    public CategoryRecord byId(Integer id) {
        return categoryRepository.findOne(id);
    }


}
