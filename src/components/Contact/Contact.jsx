import { business, fullAddress, links } from '../../data/business';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import SectionTitle from '../ui/SectionTitle';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="visit" className={styles.section} aria-labelledby="visit-title">
      <div className="container">
        <SectionTitle id="visit-title" eyebrow="Come and">
          Visit Us
        </SectionTitle>

        <div className={styles.layout}>
          <div className={styles.cards}>
            <div className={styles.card}>
              <Icon name="pin" className={styles.icon} />
              <div>
                <h3>Address</h3>
                <address>
                  {business.name}
                  <br />
                  {business.address.line1}
                  <br />
                  {business.address.line2}, {business.address.city}
                  {business.address.pincode && ` ${business.address.pincode}`}
                </address>
                <Button
                  href={links.directions}
                  variant="outline"
                  size="small"
                  className={styles.cardBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="directions" size={18} /> Get directions
                </Button>
              </div>
            </div>

            <div className={styles.card}>
              <Icon name="clock" className={styles.icon} />
              <div>
                <h3>Opening hours</h3>
                {business.hours ? (
                  <>
                    {business.hoursNote && <p className={styles.hoursNote}>{business.hoursNote}</p>}
                    <dl className={styles.hours}>
                      {business.hours.map((h) => (
                        <div key={h.days}>
                          <dt>{h.days}</dt>
                          <dd>{h.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </>
                ) : (
                  <p>Please call or WhatsApp us to check today&apos;s timings.</p>
                )}
              </div>
            </div>

            <div className={styles.card}>
              <Icon name="phone" className={styles.icon} />
              <div>
                <h3>Call &amp; WhatsApp</h3>
                <p>
                  <a href={links.call} className={styles.phone}>
                    {business.phoneDisplay}
                  </a>
                </p>
                <div className={styles.btnRow}>
                  <Button href={links.call} size="small">
                    <Icon name="phone" size={18} /> Call
                  </Button>
                  <Button href={links.whatsapp()} variant="whatsapp" size="small" target="_blank" rel="noopener noreferrer">
                    <Icon name="whatsapp" size={18} /> WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.map}>
            <iframe
              title={`Map showing ${business.name}, ${fullAddress}`}
              src={links.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
