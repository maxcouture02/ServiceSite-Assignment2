import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import MyAppointmentsPage from './pages/MyAppointmentsPage'; // Placeholder
import { findServiceById } from './servicesData';

function App() {
  const [bookingDetails, setBookingDetails] = useState(null);
  const navigate = useNavigate();

  const handleBookNow = (serviceId, date, time) => {
    const service = findServiceById(serviceId);
    if (service) {
      setBookingDetails({ service, date, time });
      navigate('/confirmation');
    } else {
      // Handle error: service not found
      console.error("Service not found for booking.");
      navigate('/'); // Or show an error message
    }
  };
  
  const handleSelectServiceForBooking = (serviceId) => {
    navigate(`/book/${serviceId}`);
  };

  return (
    <>
      <Header />
      <main className="container mt-4 mb-5" style={{ minHeight: 'calc(100vh - 200px)' }}> {/* Adjust minHeight based on header/footer */}
        <Routes>
          <Route path="/" element={<HomePage onSelectService={handleSelectServiceForBooking} />} />
          <Route path="/services" element={<ServicesPage onSelectService={handleSelectServiceForBooking} />} />
          <Route path="/book/:serviceId" element={<BookingPage onConfirmBooking={handleBookNow} />} />
          <Route path="/confirmation" element={bookingDetails ? <ConfirmationPage bookingDetails={bookingDetails} /> : <HomePage />} />
          <Route path="/my-appointments" element={<MyAppointmentsPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;