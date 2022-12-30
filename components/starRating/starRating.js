import React from "react";
import styles from "./starRating.module.scss";

export default function StarRating({ rating = 0, size }) {
  let starRatingStyle = [styles.starRating];
  if (size) starRatingStyle.push(styles[size]);
  return (
    <div className={starRatingStyle.join(" ")}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        const split = String(rating).split(".");
        let ratingStyle = [styles.rating];
        if (index <= Number(split[0])) ratingStyle.push(styles.on);
        if (split[1] && index === Number(split[0]) + 1)
          ratingStyle.push(styles.half);
        return (
          <div key={index} className={ratingStyle.join(" ")}>
            <span className={styles.star}>&#9733;</span>
          </div>
        );
      })}
    </div>
  );
}
