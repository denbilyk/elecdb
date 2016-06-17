package net.homenet.service;

import com.google.common.collect.Maps;
import net.homenet.dao.entity.HeaderRecord;
import net.homenet.dao.repository.IHeadersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author denbilyk
 *         Created: 6/16/16
 */
@Service
public class HeaderService {

    @Autowired
    private IHeadersRepository headersRepository;
    private Map<String, HeaderRecord> headerMap;


    public List<HeaderRecord> list() {
        return headersRepository.findAll();
    }

    public HeaderRecord byId(Integer id) {
        return headersRepository.findOne(id);
    }

    public HeaderRecord byName(String name) {
        return headersRepository.findByName(name);
    }

    public Map<String, HeaderRecord> getHeaderRecordMap() {
        return Maps.uniqueIndex(list(), headerRecord -> {
            return headerRecord.getName().replaceAll("\\s+", "").toLowerCase();
        });
    }

    public boolean setShow(Integer id, Boolean show) {
        HeaderRecord record = headersRepository.findOne(id);
        if (record == null) return false;
        record.setShow(show);
        headersRepository.save(record);
        return true;
    }

}
