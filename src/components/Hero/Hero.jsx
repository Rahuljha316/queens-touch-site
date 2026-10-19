import { business, links } from '../../data/business';
import heroImage from '../../assets/hero.webp';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.welcome}>Welcome to</p>
          <h1 id="hero-title" className={styles.wordmark}>
            {business.name}
          </h1>
          <p className={styles.ribbon}>{business.tagline}</p>
          <p className={styles.hindi} lang="hi">
            {business.taglineHi}
          </p>

          <p className={styles.lead}>
            Threading, facials, waxing, hair, nails, mehndi and bridal makeup — at a ladies-only
            parlour in {business.address.line2}.
          </p>

          <div className={styles.ctas}>
            <Button href="#book" className={styles.mainCta}>
              <Icon name="calendar" /> Request an Appointment
            </Button>
            <div className={styles.secondary}>
              <Button href={links.whatsapp()} variant="whatsapp" target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" /> WhatsApp
              </Button>
              <Button href={links.call} variant="outline">
                <Icon name="phone" /> Call
              </Button>
            </div>
          </div>

          <p className={styles.location}>
            <Icon name="pin" size={16} /> {business.address.line1}, {business.address.line2}
          </p>
        </div>

        <div className={styles.visual}>
          <img
            src={heroImage}
            alt=""
            width="640"
            height="1051"
            fetchpriority="high"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
