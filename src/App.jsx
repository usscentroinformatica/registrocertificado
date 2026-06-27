import { Toaster } from 'react-hot-toast';
import Hero from './components/Hero';
import RegistrationForm from './components/RegistrationForm';
import About from './components/About';
import Benefits from './components/Benefits';
import Speaker from './components/Speaker';
import Statistics from './components/Statistics';
import CTA from './components/CTA';

function App() {
  return (
    <div className="min-h-screen">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px',
            borderRadius: '12px',
          },
          success: {
            duration: 5000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Hero />
      <RegistrationForm />
      <About />
      <Benefits />
      <Speaker />
      <Statistics />
      <CTA />
    </div>
  );
}

export default App;
