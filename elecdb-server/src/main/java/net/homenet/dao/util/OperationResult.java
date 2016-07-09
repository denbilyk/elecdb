package net.homenet.dao.util;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

/**
 * @author denbilyk
 *         Created: 5/31/16
 */

public class OperationResult {
    private static OperationResult instance;

    @Getter
    @Setter(AccessLevel.PRIVATE)
    private long code;
    @Getter
    @Setter(AccessLevel.PRIVATE)
    private String text;

    @Getter
    private OperationStatus status;

    private OperationResult(OperationStatus status) {
        this.status = status;
    }

    public static OperationResult status(OperationResult.OperationStatus status) {
        instance = new OperationResult(status);
        return instance;
    }

    public OperationResult code(long code) {
        instance.setCode(code);
        return instance;
    }

    public OperationResult text(String text) {
        instance.setText(text);
        return instance;
    }

    public enum OperationStatus {
        MISS_PART("Part Number is missing!"), NO_CATEGORY("Category not found!"), SAVED(""),
        ENTRY_EXISTS("Entry with the same Part Number already exists!"), QUANTITY_FORMAT("Quantity must be a number!"),
        ENTRY_NOT_FOUND("Entry with part number not found!"), DELETE_ENTRY("Entry deleted!");

        @Getter
        private String value;

        OperationStatus(String value) {
            this.value = value;
        }
    }
}
