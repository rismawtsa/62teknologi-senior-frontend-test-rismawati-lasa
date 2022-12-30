import React from "react";
import styles from "./pageLimit.module.scss";

export default function PageLimit({ options, pageLimit, onChange }) {
  return (
    <div className={styles.pageLimit}>
      <label htmlFor="pageLimit">Show</label>
      <select value={pageLimit} id="pageLimit" onChange={onChange}>
        {options.map((item, id) => (
          <option key={`page-limit-${id}`} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
