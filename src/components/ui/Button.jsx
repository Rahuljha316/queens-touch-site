import styles from './Button.module.css';

// Renders an <a> when `href` is given, otherwise a <button>.
export default function Button({ variant = 'primary', size, href, className = '', children, ...rest }) {
  const cls = [styles.btn, styles[variant], size && styles[size], className].filter(Boolean).join(' ');
  if (href) {
    return (
      <a className={cls} href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} type="button" {...rest}>
      {children}
    </button>
  );
}
