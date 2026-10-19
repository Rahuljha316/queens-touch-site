import { business, links } from '../../data/business';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.brand}>{business.name}</p>
        <p className={styles.tagline}>{business.tagline}</p>
        <p>
          {business.address.line1}, {business.address.line2}, {business.address.city}
        </p>
        <p>
          <a href={links.call}>{business.phoneDisplay}</a>
        </p>
        {business.socials.length > 0 && (
          <ul className={styles.socials}>
            {business.socials.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
        <p className={styles.copy}>
          © {new Date().getFullYear()} {business.name}. Appointment requests are confirmed by phone or WhatsApp.
        </p>
      </div>
    </footer>
  );
}
