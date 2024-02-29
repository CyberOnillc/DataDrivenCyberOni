import styles from "./loading-dots.module.css";

const LoadingDots = () => {
  return (
    <span className={styles.loading}>
      <span className={`bg-gray-900 dark:bg-gray-100`} />
      <span className={`bg-gray-900 dark:bg-gray-100`} />
      <span className={`bg-gray-900 dark:bg-gray-100`} />
    </span>
  );
};

export default LoadingDots;
