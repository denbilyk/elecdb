package net.homenet.dao.repository;

import net.homenet.dao.entity.HeaderRecord;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author denbilyk
 *         Created: 6/16/16
 */
public interface IHeadersRepository extends JpaRepository<HeaderRecord, Integer> {

    HeaderRecord findByName(String name);
}
