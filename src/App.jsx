import { useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import About from './components/About/About';
import BookingForm from './components/BookingForm/BookingForm';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import WhatsAppFab from './components/WhatsAppFab/WhatsAppFab';
import SetupChecklist from './components/SetupChecklist/SetupChecklist';

export default function App() {
  // A new object each time so picking the same service twice still re-applies it.
  const [preselect, setPreselect] = useState(null);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <div id="top">
          <Hero />
        </div>
        <Services onSelect={(name) => setPreselect({ name })} />
        <About />
        <BookingForm preselect={preselect} />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
      {import.meta.env.DEV && <SetupChecklist />}
    </>
  );
}
