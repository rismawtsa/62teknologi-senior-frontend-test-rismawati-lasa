import React, { useState } from "react";
import Image from "next/image";
import styles from "./slideShow.module.scss";

export default function SlideShow({ images, className }) {
  const imagesLength = images.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNextClick = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleCircleClick = (idx) => {
    setCurrentIndex(idx);
  };

  const prevArrow = currentIndex > 0 && (
    <button
      className={styles.prevArrow}
      onClick={() => handlePrevClick()}
    >{`<`}</button>
  );

  const nextArrow = currentIndex < imagesLength - 1 && (
    <button
      className={styles.nextArrow}
      onClick={() => handleNextClick()}
    >{`>`}</button>
  );

  if (!images || images.length === 0) return null;

  let slideShowClassName = [styles.slideShow];
  if (className) slideShowClassName.push(className);
  return (
    <div className={slideShowClassName.join(" ")}>
      <div className={styles.imageContainer}>
        {prevArrow}
        <Image
          src={images[currentIndex]}
          alt={`photo-${currentIndex}`}
          width={320}
          height={320}
        />
        {nextArrow}
      </div>
      <div className={styles.cricleWrapper}>
        {images.map((item, id) => {
          let circleStyle = [styles.circle];
          if (id === currentIndex) circleStyle.push(styles.active);
          return (
            <button
              key={item}
              className={circleStyle.join(" ")}
              onClick={() => handleCircleClick(id)}
            ></button>
          );
        })}
      </div>
    </div>
  );
}
