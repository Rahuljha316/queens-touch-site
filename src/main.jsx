import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/cinzel';
import '@fontsource-variable/montserrat';
import '@fontsource/great-vibes/latin-400.css';
import './styles/tokens.css';
import './styles/global.css';
import App from './App';
import { injectStructuredData } from './lib/structuredData';

injectStructuredData();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
