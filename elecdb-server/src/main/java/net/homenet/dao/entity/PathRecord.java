package net.homenet.dao.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * @author denbilyk
 *         Created: 5/31/16
 */
@EqualsAndHashCode(exclude = "id")
@Entity
@Table(name = "def_paths", uniqueConstraints = {
        @UniqueConstraint(columnNames = "qualifier")
})

public class PathRecord {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Getter
    @Setter
    private String qualifier;

    @Getter
    @Setter
    private String libPathGeneral;

    @Getter
    @Setter
    private String libPathConn;

    @Getter
    @Setter
    private String libPathICs;

    @Getter
    @Setter
    private String footPathIPC;

    @Getter
    @Setter
    private String footPathCustom;

}
