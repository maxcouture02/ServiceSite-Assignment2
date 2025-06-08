import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import MyAppointmentsPage from './pages/MyAppointmentsPage';
import { findServiceById } from './servicesData';

function App() {
  const [bookingDetails, setBookingDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleViewPackageDetails = (serviceId) => {
    navigate('/services', { state: { selectedPackageId: serviceId } });
  };

  useEffect(() => {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          scrollObserver.unobserve(entry.target); // Stop observing once visible, to not replay animations
        }
      });
    }, { 
        threshold: 0.1, // Trigger when 10% of the element is visible
    });

    // Function to find and observe elements
    const observeElements = () => {
        const elementsToAnimate = document.querySelectorAll('.animate-on-scroll:not(.is-visible)');
        elementsToAnimate.forEach(el => {
            scrollObserver.observe(el);
        });
    };

    // Initial observation
    observeElements();

    const timeoutId = setTimeout(observeElements, 100); 

    return () => {
      scrollObserver.disconnect(); // Cleanup observer when App unmounts
      clearTimeout(timeoutId); // Clear timeout on unmount
    };
  }, [location.pathname]); // Re-run effect if the pathname (route) changes

  return (
    <>
      <Header />
      <main className="container mt-4 mb-5" style={{ minHeight: 'calc(100vh - 200px)' }}> 
        <Routes>
          <Route path="/" element={<HomePage onSelectService={handleSelectServiceForBooking} onViewPackageDetails={handleViewPackageDetails} />} />
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