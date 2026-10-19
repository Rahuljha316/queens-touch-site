import styles from './SectionTitle.module.css';

export default function SectionTitle({ id, eyebrow, children, intro }) {
  return (
    <header className={styles.wrap}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 id={id} className={styles.title}>
        {children}
      </h2>
      <span className={styles.rule} aria-hidden="true">
        <span />
      </span>
      {intro && <p className={styles.intro}>{intro}</p>}
    </header>
  );
}
