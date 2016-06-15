package net.homenet.dao.repository;

import net.homenet.dao.entity.datatable.DataTableRecord;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by denbilyk on 5/26/16.
 */
public interface IDataTableRepository extends JpaRepository<DataTableRecord, Long> {

}
