package net.homenet.dao.util;

import java.lang.reflect.Constructor;

/**
 * @author denbilyk
 *         Created: 6/24/16
 */
public class Converter<T> {

    private T type;

    private Converter(String value, Object... params) {
        try {
            Class clazz = Class.forName(value);
            for (Constructor constructor : clazz.getConstructors()) {
                Object obj = findConstructor(constructor, params);
                if (obj != null) {
                    this.type = (T) obj;
                    break;
                }
            }
        } catch (ClassNotFoundException e) {

        }
    }

    public static <T> Converter<T> get(String className, Object... params) {
        return new Converter<>(className, params);
    }

    public T value() {
        return type;
    }


    private Object findConstructor(Constructor c, Object... params) {
        Object obj = null;
        try {
            obj = c.newInstance(params);
        } catch (Throwable e) {
            //no appropriative constructor
        }
        return obj;
    }
}
