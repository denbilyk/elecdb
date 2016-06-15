package net.homenet.dao.util;

/**
 * @author denbilyk
 *         Created: 5/31/16
 */
public class CategoryNotFoundException extends Exception {

    public CategoryNotFoundException(String category) {
        super("Category with name: " + category + " not found!");
    }

    public CategoryNotFoundException(Long id) {
        super("Category with ID: " + id + " not found!");
    }
}
