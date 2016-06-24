package net.homenet.nodao.repository;

import net.homenet.nodao.entity.HeaderRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author denbilyk
 *         Created: 6/22/16
 */
public interface IHeadersMongoRepository extends MongoRepository<HeaderRecord, Integer> {

    HeaderRecord findByName(String name);
}
