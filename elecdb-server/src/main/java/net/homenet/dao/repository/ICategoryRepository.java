package net.homenet.dao.repository;

import net.homenet.dao.entity.CategoryRecord;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author denbilyk
 *         Created: 5/31/16
 */
public interface ICategoryRepository extends JpaRepository<CategoryRecord, Long> {

    CategoryRecord findCategoryRecordByCategory(String category);

}
