import { useEffect, useState } from 'react';
import { links } from '../../data/business';
import Icon from '../ui/Icon';
import styles from './WhatsAppFab.module.css';

// Floating WhatsApp button. Hidden at the top of the page (the hero already has
// one) and while the booking form or contact section is on screen.
export default function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const watched = ['top', 'book', 'visit'].map((id) => document.getElementById(id)).filter(Boolean);
    const onScreen = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? onScreen.add(e.target.id) : onScreen.delete(e.target.id)));
        setVisible(onScreen.size === 0);
      },
      { rootMargin: '0px 0px -30% 0px' },
    );
    watched.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={links.whatsapp()}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.fab} ${visible ? styles.visible : ''}`}
      aria-label="Chat with us on WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <Icon name="whatsapp" size={30} />
    </a>
  );
}
