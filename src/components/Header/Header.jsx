import { useEffect, useState } from 'react';
import { business, links } from '../../data/business';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import styles from './Header.module.css';

const nav = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#book', label: 'Book' },
  { href: '#visit', label: 'Visit Us' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.solid : ''}`}>
      <div className={`container ${styles.bar}`}>
        <a href="#top" className={styles.brand} onClick={close}>
          <Icon name="crown" size={18} className={styles.crown} />
          <span>{business.name}</span>
        </a>

        <nav className={styles.desktopNav} aria-label="Main">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href={links.call} className={styles.iconBtn} aria-label={`Call ${business.phoneDisplay}`}>
            <Icon name="phone" />
          </a>
          <Button href="#book" size="small" className={styles.bookBtn} onClick={close}>
            Book
          </Button>
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      <nav id="mobile-nav" className={styles.mobileNav} hidden={!open} aria-label="Main">
        <ul className="container">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={close}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
