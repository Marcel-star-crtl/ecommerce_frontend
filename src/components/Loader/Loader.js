import React from 'react';
import styles from './Loader.module.css';

const Loader = ({ size = 'medium', color = '#E8A5C4', fullScreen = false }) => {
  const sizeClass = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large
  }[size];

  if (fullScreen) {
    return (
      <div className={styles.fullScreenLoader}>
        <div className={`${styles.spinner} ${sizeClass}`} style={{ borderTopColor: color }}>
          <div className={styles.innerSpinner}></div>
        </div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.loaderContainer}>
      <div className={`${styles.spinner} ${sizeClass}`} style={{ borderTopColor: color }}>
        <div className={styles.innerSpinner}></div>
      </div>
    </div>
  );
};

export default Loader;