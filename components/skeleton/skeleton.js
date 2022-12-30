import styles from "./skeleton.module.scss";

export function SkeletonDetail({ isLoading, count, style }) {
  if (!isLoading) return;

  let elements = [];
  for (let i = 1; i <= count; i++) {
    elements.push(
      <div key={i} className={styles.skeletonWrapper} style={style}>
        <div className={styles.skeletonImg}></div>
        <div className={styles.skeletonText}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return elements;
}

export function SkeletonReviews({ isLoading, count, style }) {
  if (!isLoading) return;

  let elements = [];
  for (let i = 1; i <= count; i++) {
    elements.push(
      <div key={i} className={styles.skeletonReview} style={style}>
        <div className={styles.skeletonImg}></div>
        <div className={styles.skeletonText}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return elements;
}
