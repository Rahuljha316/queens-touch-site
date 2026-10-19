import { business } from '../../data/business';
import Icon from '../ui/Icon';
import SectionTitle from '../ui/SectionTitle';
import styles from './About.module.css';

export default function About() {
  const { owner } = business;
  const runBy = owner.name ? `, run by ${owner.name}` : '';

  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.portrait}>
          {owner.photo ? (
            <img src={owner.photo} alt={owner.name ?? 'Our beautician'} width="320" height="320" loading="lazy" />
          ) : (
            <div className={styles.monogram} aria-hidden="true">
              <Icon name="crown" size={34} />
              <span>QT</span>
            </div>
          )}
        </div>

        <div className={styles.copy}>
          <SectionTitle id="about-title" eyebrow="About">
            {business.name}
          </SectionTitle>
          <p>
            {business.name} is a ladies-only beauty parlour in {business.address.line2}
            {runBy}. Send us your
            preferred day and time on WhatsApp and we will confirm a slot that works for you.
          </p>
          {owner.yearsOfExperience && (
            <p className={styles.experience}>
              <strong>{owner.yearsOfExperience}+ years</strong> of beauty experience
            </p>
          )}
          <ul className={styles.points}>
            <li>Ladies-only parlour</li>
            <li>Threading to bridal makeup under one roof</li>
            <li>Appointments on WhatsApp or phone</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
