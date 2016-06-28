import React from "react";
import Utils from "../../Utils.jsx";
import Button from "muicss/lib/react/button";
import ColumnFilter from "../column-filter/ColumnFilter.react";

export default (context)=> {
    let self = context;
    return (
        <div>
            <ColumnFilter table={self}/>
            <div className="vgrid-container">
                <table id="data-table">
                    <thead>
                    <tr className="row-header">
                        {self.items.header.map(item => {
                            return (
                                <th className="col-header" key={Utils.id()} hidden={!item.show}>{item.name}</th>)
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {self.items.rows.map((row, i) => {
                        return (
                            <tr key={Utils.id()} className={i % 2 == 0 ? " " : "row-odd"}>
                                {row.map(item => {
                                    return (
                                        <td className="data-col row-divider" key={Utils.id()}>
                                            <Button variant="fab" color="primary"
                                                    className="btn-edit mui--pull-right">e</Button>
                                            <span>{item}</span>
                                        </td>)
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

