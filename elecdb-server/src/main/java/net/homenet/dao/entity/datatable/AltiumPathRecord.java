package net.homenet.dao.entity.datatable;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import net.homenet.dao.entity.DomainObject;
import net.homenet.service.dto.datatable.NonHeader;

import javax.persistence.*;

/**
 * @author denbilyk
 *         Created: 5/27/16
 */
@EqualsAndHashCode(exclude = {
        "abstractRecord"
})
@Entity
@Table(name = "library_path")
public class AltiumPathRecord implements DomainObject{


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Getter
    @Setter
    @NonHeader
    private Long id;

    @NonHeader
    @Setter
    @Getter
    @OneToOne
    @JoinColumn(name = "frn_part_number")
    private AbstractRecord abstractRecord;

    @Getter
    @Setter
    private String footprintPath;

    @Getter
    @Setter
    private String libraryPath;

    @Getter
    @Setter
    private String footprintPath2;

    @Getter
    @Setter
    private String footprintRef2;

    @Getter
    @Setter
    private String footprintRef3;

    @Getter
    @Setter
    private String footprintRef4;

    @Getter
    @Setter
    private String footprintRef5;

    @Getter
    @Setter
    private String footprintRef6;

    @Getter
    @Setter
    private String footprintRef7;

    @Getter
    @Setter
    private String footprintRef8;

    @Getter
    @Setter
    private String footprintRef9;
}
