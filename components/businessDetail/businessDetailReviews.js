import React from "react";
import Image from "next/image";
import noPic from "../../public/images/no-image.png";
import StarRating from "../starRating/starRating";
import { SkeletonReviews } from "../skeleton/skeleton";
import styles from "./businessDetail.module.scss";

export default function BusinessDetailReviews({ review = [], loading }) {
  if (loading) {
    return <SkeletonReviews isLoading={loading} count={3} />;
  }
  return (
    <div className={styles.reviewContainer}>
      <h3 className={styles.subTitle}>Reviews</h3>
      {review.map((item, id) => {
        return (
          <div key={`review-${id}`}>
            <div className={styles.user}>
              <div className={styles.userPhoto}>
                <Image
                  src={item.user.image_url ? item.user.image_url : noPic}
                  alt={item.user.name}
                  width={50}
                  height={50}
                />
              </div>
              <div className={styles.userInfo}>
                <span>{item.user.name}</span>
                <div className={styles.userRating}>
                  <StarRating rating={item.rating} size="small" />
                  <div>{item.time_created.substring(0, 10)}</div>
                </div>
                <div style={{ marginTop: "0.5rem" }}>{item.text}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
