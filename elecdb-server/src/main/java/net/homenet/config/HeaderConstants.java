package net.homenet.config;

import lombok.Getter;

/**
 * @author denbilyk
 *         Created: 6/27/16
 */
public enum HeaderConstants {
    PARTNUMBER(1), CATEGORY(2), QUANTITY(3);

    @Getter
    private int id;

    HeaderConstants(int id) {
        this.id = id;
    }
}
