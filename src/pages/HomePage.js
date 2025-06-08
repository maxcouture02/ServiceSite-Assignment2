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
      {/* Hero Section */}
       <Row 
        className="my-5 p-sm-2 p-md-4 rounded hero-section align-items-center animate-on-scroll"
        // style={{ backgroundImage: `url(/images/hero-background.jpg)` }} // Assuming this is in App.css now
      >
        <Col md={7} className="hero-text-content mb-4 mb-md-0">
          <div className="hero-content-wrapper p-4"> {/* Frosted glass for text */}
            <h1 className="mb-3">Fast & Reliable Bike Care</h1>
            <p className="lead mb-4">
              Whether you need a quick fix to get back on your commute or a full tune-up for weekend adventures, Urban Wheel has you covered. Easy online booking, expert service.
            </p>
            <Button variant="primary" className="btn-lg" onClick={() => navigate('/services')}>
              Explore All Services
            </Button>
          </div>
        </Col>

        <Col md={5} className="d-none d-md-flex align-items-center justify-content-center"> {/* Use flex to center inner div */}
          {/* Inner div to control the width of the frosted glass for the image */}
          <div className="hero-content-wrapper p-3 d-inline-block"> {/* p-3 for padding inside glass, d-inline-block to shrink-wrap */}
            <img 
              src="/images/hero-illustration.png" 
              alt="Cycling illustration" 
              className="img-fluid" // img-fluid makes it responsive
              style={{ maxHeight: '300px', display: 'block' }} // display: block to remove extra space below image if d-inline-block on parent
            />
          </div>
        </Col>
      </Row>

      {/* Quick Services */}
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

      {/* Service Packages */}
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