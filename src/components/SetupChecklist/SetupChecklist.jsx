import { useState } from 'react';
import { missingSetupItems } from '../../lib/setupChecklist';
import styles from './SetupChecklist.module.css';

// Development-only reminder of placeholder details. Never shown on the live site.
export default function SetupChecklist() {
  const [open, setOpen] = useState(false);
  const items = missingSetupItems();
  if (!items.length) return null;

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.pill} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        Setup: {items.length} to do
      </button>
      {open && (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
