package net.homenet.nodao.repository;

import net.homenet.nodao.entity.CategoryRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author denbilyk
 *         Created: 6/23/16
 */
public interface ICategoryMongoRepository extends MongoRepository<CategoryRecord, Integer> {

    CategoryRecord findByName(String name);
}
