import React, { useState } from "react";
import styles from "./search.module.scss";

export default function Search(props) {
  const { setQueries, onSearch, onClear, fields, queries } = props;
  const [errors, setError] = useState({});
  const onInputChange = (e) => {
    const { value, name } = e.target;
    setQueries({
      ...queries,
      [name]: value,
    });

    setError({
      ...errors,
      [name]: null,
    });
  };

  const handleSearch = () => {
    let isValid = true;
    let validation = fields.reduce((prev, curr) => {
      if (!queries[curr.name] && curr.isRequired) {
        isValid = false;
        prev = { ...prev, [curr.name]: `${curr.label} is required` };
      }

      return prev;
    }, {});

    if (!isValid) {
      setError({
        ...errors,
        ...validation,
      });
    } else {
      console.log("test");
      onSearch();
    }
  };

  return (
    <div className={styles.searchContainer}>
      {fields &&
        fields.map((field, id) => {
          let inputClassName = [styles.input];
          if (errors[field.name]) inputClassName.push(styles.inputError);
          return (
            <div className={styles.searchItem} key={`field-${id}`}>
              <label htmlFor={field.id}>
                {field.label}
                {field.isRequired && (
                  <span className={styles.isRequired}>*</span>
                )}
              </label>
              <input
                className={inputClassName.join(" ")}
                id={field.id}
                name={field.name}
                value={queries[field.name]}
                placeholder={field.placeholder}
                onChange={onInputChange}
              />
              {errors[field.name] && (
                <div className={styles.error}>{errors[field.name]}</div>
              )}
            </div>
          );
        })}
      <div className={styles.buttonContainer}>
        <button onClick={handleSearch} className={styles.btnSearch}>
          Search
        </button>
        <button onClick={onClear} className={styles.btnClear}>
          Clear
        </button>
      </div>
    </div>
  );
}
