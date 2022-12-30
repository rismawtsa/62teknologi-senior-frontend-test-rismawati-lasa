import React from "react";
import styles from "./spinner.module.scss";

export default function Spinner(loading) {
  if (!loading) return null;

  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
}
