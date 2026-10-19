import { business, links } from '../../data/business';
import { services } from '../../data/services';
import SectionTitle from '../ui/SectionTitle';
import styles from './Services.module.css';

export default function Services({ onSelect }) {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className="container">
        <SectionTitle id="services-title" eyebrow="Our" intro="Tap a service to request an appointment for it.">
          Services
        </SectionTitle>

        <ul className={styles.grid}>
          {services.map((s) => (
            <li key={s.id} className={styles.card}>
              <div className={styles.photo}>
                <img src={s.image} alt="" width="400" height="400" loading="lazy" decoding="async" />
              </div>
              <h3 className={styles.name}>{s.name}</h3>
              <p className={styles.desc}>{s.description}</p>

              {s.items.length > 0 && (
                <ul className={styles.items}>
                  {s.items.map((item) => (
                    <li key={item.name}>
                      <span>{item.name}</span>
                      {business.showPrices && item.price && <span className={styles.price}>{item.price}</span>}
                    </li>
                  ))}
                </ul>
              )}

              <a href="#book" className={styles.request} onClick={() => onSelect(s.name)}>
                Request <span className="visually-hidden">{s.name}</span> →
              </a>
            </li>
          ))}
        </ul>

        {!business.showPrices && (
          <p className={styles.priceNote}>
            For prices, please{' '}
            <a href={links.whatsapp('Hello, could you share the price for ')} target="_blank" rel="noopener noreferrer">
              ask on WhatsApp
            </a>{' '}
            or <a href={links.call}>call us</a>. A full price list is coming soon.
          </p>
        )}
        <p className={styles.disclaimer}>Images are illustrative.</p>
      </div>
    </section>
  );
}
