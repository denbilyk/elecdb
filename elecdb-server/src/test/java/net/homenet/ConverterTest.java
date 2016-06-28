package net.homenet;

import net.homenet.dao.util.Converter;
import org.junit.Test;

import java.lang.reflect.InvocationTargetException;

/**
 * @author denbilyk
 *         Created: 6/24/16
 */
public class ConverterTest {


    @Test
    public void TestConverter() throws ClassNotFoundException, IllegalAccessException, InstantiationException, InvocationTargetException {
        String longType = Long.class.getName();
        Object value = Converter.get(longType, 11L).value();
    }
}
