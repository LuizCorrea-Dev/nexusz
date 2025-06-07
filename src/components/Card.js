import styles from "../styles/card.module.css";
import Link from "next/link";

export default function Card({
  title,
  content,
  buttonText,
  buttonLink,
  buttons,
}) {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <div className={styles.content}>{content}</div>
      {buttonLink && (
        <Link href={buttonLink} className={styles.btn}>
          {buttonText}
        </Link>
      )}
      {buttons &&
        buttons.map((button, index) => (
          <button
            key={index}
            className={`${styles.btn} ${styles[button.className]}`}
            onClick={button.onClick}
          >
            {button.text}
          </button>
        ))}
    </div>
  );
}
