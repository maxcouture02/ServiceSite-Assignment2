import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { quickServices, servicePackages } from '../servicesData';

const HomePage = ({ onSelectService }) => {
  const navigate = useNavigate();

  const handleBookQuickService = (serviceId) => {
    onSelectService(serviceId); // This will navigate to BookingPage via App.js
  };

  const handleLearnMorePackage = (serviceId) => {
     // For prototype, clicking "Learn More" on homepage can also lead to booking
     // Or you could have a dedicated Service Detail page
    onSelectService(serviceId);
  };

  return (
    <Container>
      {/* Hero Section - Inspired by Jennifer's welcoming feel */}
      <Row className="my-5 p-4 rounded hero-section align-items-center animate-on-scroll">
        <Col md={7}>
          <h1>Fast & Reliable Bike Care</h1>
          <p className="lead hero-content-wrapper">
            Whether you need a quick fix to get back on your commute or a full tune-up for weekend adventures, Urban Wheel has you covered. Easy online booking, expert service.
          </p>
          <Button variant="primary" className="btn-accent-blue btn-lg" onClick={() => navigate('/services')}>
            Explore All Services
          </Button>
        </Col>
        <Col md={5} className="d-none d-md-block text-center hero-content-wrapper">
            <img src="/images/hero-illustration.png" alt="Cycling illustration" className="img-fluid" style={{maxHeight: '300px'}}/>
        </Col>
      </Row>

      {/* Quick Services - For James */}
      <Row className="mb-5 animate-on-scroll">
        <Col>
          <h2 className="mb-4 text-center">Same-Day Repairs? <span className="accent-blue">Book Instantly!</span></h2>
          <Row>
            {quickServices.slice(0, 3).map(service => ( // Show top 3 quick services
              <Col md={4} key={service.id} className="animate-on-scroll">
                <ServiceCard 
                  service={service} 
                  onBook={handleBookQuickService} 
                  isQuickService={true} 
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Service Packages - For Jennifer */}
      <Row className="mb-5 animate-on-scroll">
        <Col>
          <h2 className="mb-4 text-center">Find the Right Care for Your Bike</h2>
           <Row>
            {servicePackages.map(pkg => (
              <Col md={4} key={pkg.id} className="animate-on-scroll">
                <ServiceCard 
                  service={pkg} 
                  onLearnMore={handleLearnMorePackage} 
                  isQuickService={false}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;