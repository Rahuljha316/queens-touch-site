const paths = {
  phone: (
    <path d="M6.6 3.2c.6-.4 1.4-.2 1.8.4l1.6 2.9c.3.6.2 1.2-.3 1.6l-1 .9c.9 1.9 2.4 3.4 4.3 4.3l.9-1c.4-.5 1-.6 1.6-.3l2.9 1.6c.6.4.8 1.2.4 1.8-.9 1.6-2.5 2.6-4.3 2.2C9 16.6 4.4 12 3.6 7.5c-.4-1.8.5-3.4 3-4.3Z" fill="currentColor" transform="translate(1.5 1.5)" />
  ),
  whatsapp: (
    <>
      <path d="M12 3.2a8.7 8.7 0 0 0-7.5 13.1L3.3 20.7l4.5-1.2A8.7 8.7 0 1 0 12 3.2Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.8 7.8c.3-.2.8-.1 1 .3l.8 1.6c.1.3.1.7-.2.9l-.5.5c.5 1.1 1.5 2.1 2.7 2.7l.5-.5c.2-.3.6-.3.9-.2l1.6.8c.4.2.5.7.3 1-.5.9-1.4 1.5-2.5 1.2-2.6-.6-4.6-2.6-5.2-5.2-.2-1.1.2-2.1.9-2.6Z" fill="currentColor" />
    </>
  ),
  pin: <path d="M12 22s-7.5-7.5-7.5-12.5a7.5 7.5 0 0 1 15 0C19.5 14.5 12 22 12 22Zm0-9.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" fill="currentColor" fillRule="evenodd" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  close: <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  directions: <path d="M12 2.5 21.5 12 12 21.5 2.5 12 12 2.5Zm-2.5 12V11.5H14V9l3 3-3 3v-2.5h-2.5v2Z" fill="currentColor" fillRule="evenodd" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  crown: <path d="M3 18 1.5 7l6 4.5L12 4l4.5 7.5 6-4.5L21 18H3Zm0 2h18v1.5H3V20Z" fill="currentColor" />,
};

export default function Icon({ name, size = 20, className, title }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  );
}
