package net.homenet.nodao.service;

import com.google.common.collect.Sets;
import net.homenet.nodao.entity.HeaderRecord;
import net.homenet.nodao.repository.IHeadersMongoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.TreeSet;

/**
 * @author denbilyk
 *         Created: 6/22/16
 */
@Service
public class HeaderMongoService {

    @Autowired
    private IHeadersMongoRepository headersMongoRepository;


    public Collection<HeaderRecord> list() {
        List<HeaderRecord> headerRecords = headersMongoRepository.findAll();
        TreeSet<HeaderRecord> set = Sets.newTreeSet();
        set.addAll(headerRecords);
        return set;
    }

    public HeaderRecord getPkRecord() {
        return headersMongoRepository.findByName("Part Number");
    }

    public HeaderRecord getCategoryRecord() {
        return headersMongoRepository.findByName("Category");
    }

    public HeaderRecord getQuantityRecord() {
        return headersMongoRepository.findByName("Quantity");
    }

    public HeaderRecord byId(Integer id) {
        return headersMongoRepository.findOne(id);
    }
}
