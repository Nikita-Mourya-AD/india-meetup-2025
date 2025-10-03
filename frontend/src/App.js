import React, { useState } from 'react';
import Hero from './components/Hero';
import TechTracks from './components/TechTracks';
import Location from './components/Location';
import RegistrationForm from './components/RegistrationForm';
import SuccessMessage from './components/SuccessMessage';

function App() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);

  const handleRegistrationSuccess = (data) => {
    setRegistrationData(data);
    setRegistrationSuccess(true);
  };

  const handleBackToForm = () => {
    setRegistrationSuccess(false);
    setRegistrationData(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {!registrationSuccess ? (
        <>
          <Hero />
          <TechTracks />
          <Location />
          <RegistrationForm onSuccess={handleRegistrationSuccess} />
        </>
      ) : (
        <SuccessMessage 
          data={registrationData} 
          onBackToForm={handleBackToForm} 
        />
      )}
    </div>
  );
}

export default App;
