package net.homenet.nodao.service;

import net.homenet.nodao.entity.CategoryRecord;
import net.homenet.nodao.repository.ICategoryMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author denbilyk
 *         Created: 6/23/16
 */
@Service
public class CategoryMongoService {

    @Autowired
    private ICategoryMongoRepository categoryMongoRepository;


    public List<CategoryRecord> list() {
        return categoryMongoRepository.findAll();
    }

    public CategoryRecord getById(Integer id) {
        return categoryMongoRepository.findOne(id);
    }

    public CategoryRecord getByName(String name) {
        return categoryMongoRepository.findByName(name);
    }
}
