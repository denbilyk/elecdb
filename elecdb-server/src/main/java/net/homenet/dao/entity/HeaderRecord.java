package net.homenet.dao.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * @author denbilyk
 *         Created: 6/16/16
 */

@EqualsAndHashCode
@Table(name = "headers", uniqueConstraints = @UniqueConstraint(name = "uniqu_header_name", columnNames = "name"))
@Entity
public class HeaderRecord implements DomainObject {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private Boolean show;

}
