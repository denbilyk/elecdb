package net.homenet;

import net.homenet.dao.entity.HeaderRecord;
import net.homenet.dao.entity.DataTableRecord;
import net.homenet.dao.repository.IHeadersRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ElecdbApplicationTests {

    @Autowired
    private IHeadersRepository headersRepository;

    @Test
    public void contextLoads() {
        List<DataTableRecord> records = new ArrayList<>(); //dataTableRepository.findAll();
        for (DataTableRecord record : records) {
            record.getCategory();
        }
        List<HeaderRecord> headerRecords = headersRepository.findAll();
        try {
            FileOutputStream fs = new FileOutputStream("dataTableRecordsList.ser");
            ObjectOutputStream os = new ObjectOutputStream(fs);
            os.writeObject(records);
            os.flush();
            os.close();
            fs = new FileOutputStream("headerRecordsList.ser");
            os = new ObjectOutputStream(fs);
            os.writeObject(headerRecords);
            os.flush();
            os.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
