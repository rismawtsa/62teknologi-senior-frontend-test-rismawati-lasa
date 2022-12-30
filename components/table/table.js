import React, { useState } from "react";
import Spinner from "../spinner/spinner";
import styles from "./table.module.scss";

const Table = (props) => {
  const { column, data, loading, className } = props;

  const [filterData, setFilterData] = useState([]);

  const handleFilter = (event) => {
    const { value, name } = event.target;

    if (value) {
      const filter = data.filter((item) =>
        String(item[name]).toLowerCase().includes(value.toLowerCase())
      );
      setFilterData(filter);
    } else {
      setFilterData([]);
    }
  };

  const columns = column.map((item, id) => {
    return <th key={`th-${id}`}>{item.name}</th>;
  });

  const columnFilters = column.map((item, id) => {
    return (
      <th key={`th-filter-${id}`}>
        {item.enableFilter && (
          <input
            className={styles.inputFilter}
            name={item.id}
            onChange={handleFilter}
          />
        )}
      </th>
    );
  });

  let dataRow = data;
  if (filterData.length > 0) dataRow = filterData;
  let rows =
    dataRow &&
    dataRow.map((row, rowId) => {
      return (
        <tr key={`tr-${rowId}`}>
          {column.map((col, colId) => {
            return (
              <td
                key={`td-${colId}`}
                style={{ width: col.width && `${col.width}%` }}
              >
                {row[col.id]}
              </td>
            );
          })}
        </tr>
      );
    });

  if (data && data.length === 0) {
    rows = (
      <tr>
        <td colSpan={columns.length} className={styles.nodata}>
          No Data
        </td>
      </tr>
    );
  }
  if (loading)
    rows = (
      <tr>
        <td colSpan={columns.length}>
          <Spinner loading={loading} />
        </td>
      </tr>
    );

  let tableClassName = [styles.table];
  if (className) tableClassName.push(className);
  return (
    <table className={tableClassName.join(" ")}>
      <thead>
        <tr>{columns}</tr>
        {rows && rows.length > 0 && <tr>{columnFilters}</tr>}
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Table;
