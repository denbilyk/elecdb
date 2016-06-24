package net.homenet.nodao.repository;

import net.homenet.nodao.entity.DataTableRecord;
import net.homenet.nodao.entity.RecordField;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author denbilyk
 *         Created: 6/22/16
 */
public interface IDataTableMongoRepository extends MongoRepository<DataTableRecord, RecordField> {

}
