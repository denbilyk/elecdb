package net.homenet.dao.repository;

import net.homenet.dao.entity.DataTableRecord;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author denbilyk
 *         Created: 6/24/16
 */
public interface IDataTableRepository extends JpaRepository<DataTableRecord, String> {
}
