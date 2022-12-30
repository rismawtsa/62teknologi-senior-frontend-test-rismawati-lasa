import React from "react";
import { DAYS_MAP } from "../../constant";
import styles from "./businessDetail.module.scss";

export default function BusinessDetailHours({ hours = [] }) {
  return (
    <div className={styles.hours}>
      <h3 className={styles.subTitle}>Hours</h3>
      {hours[0]?.open.map((item, id) => {
        return (
          <div key={`hour-${id}`}>
            <span className={styles.label}>{DAYS_MAP[item.day]}</span>
            <span>
              {item.start.substring(0, 2)}:{item.start.substring(2)} AM -{" "}
              {item.end.substring(0, 2)}:{item.end.substring(2)} PM
            </span>
          </div>
        );
      })}
    </div>
  );
}
