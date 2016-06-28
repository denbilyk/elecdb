package net.homenet.service;

import net.homenet.config.HeaderConstants;
import net.homenet.dao.entity.HeaderRecord;
import net.homenet.dao.repository.IHeadersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author denbilyk
 *         Created: 6/16/16
 */
@Service
public class HeaderService {

    @Autowired
    private IHeadersRepository headersRepository;


    public List<HeaderRecord> list() {
        return headersRepository.findAll();
    }

    public HeaderRecord byId(Integer id) {
        return headersRepository.findOne(id);
    }

    public HeaderRecord byName(String name) {
        return headersRepository.findByName(name);
    }

    public String getDataTypeById(Integer id) {
        return headersRepository.findOne(id).getDataType();
    }

    public Integer getPnId() {
        return HeaderConstants.PARTNUMBER.getId();
    }

    public Integer getCategoryId() {
        return HeaderConstants.CATEGORY.getId();
    }

    public Integer getQuantityId() {
        return HeaderConstants.QUANTITY.getId();
    }

    public Integer getIdByName(String name) {
        HeaderRecord headerRecord = headersRepository.findByName(name);
        if (headerRecord == null) return null;
        return headerRecord.getId();
    }

    public boolean setShow(Integer id, Boolean show) {
        HeaderRecord record = headersRepository.findOne(id);
        if (record == null) return false;
        record.setShow(show);
        headersRepository.save(record);
        return true;
    }

}
