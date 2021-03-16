import React from "react";
import styles from "./Card.module.scss";

const Card = ({
  imgURL,
  name,
  description = "",
  cardHeight = "200px",
  cardWidth = "100px",
}) => {
  return (
    <>
      <div
        style={{
          height: cardHeight,
          width: cardWidth,
        }}
        className={styles.cardWrapper}
      >
        <div className={styles.imgContainer}>
          <img src={imgURL} alt="imageProp" />
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.nameTxt}>{name}</p>
          <p className={styles.descriptionTxt}>{description}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
