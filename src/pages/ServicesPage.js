import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { quickServices, servicePackages, findServiceById } from '../servicesData';
import PackageDetail from '../components/PackageDetail'; // For showing details

const ServicesPage = ({ onSelectService }) => {
  const [selectedServiceId, setSelectedServiceId] = useState(servicePackages[0]?.id || null); // Default to first package
  const [activeTab, setActiveTab] = useState('packages'); // 'packages' or 'quick'

  const currentService = findServiceById(selectedServiceId);

  const handleSelectForDetail = (id) => {
    setSelectedServiceId(id);
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Our Services</h1>
      
      <Nav variant="tabs" defaultActiveKey="packages" onSelect={(k) => setActiveTab(k)} className="mb-4">
        <Nav.Item>
          <Nav.Link eventKey="packages">Service Packages</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="quick">Quick Repairs</Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === 'packages' && (
         <Row>
          <Col md={4}>
            <h4 className="mb-3">Tune-Up Packages</h4>
            {servicePackages.map(pkg => (
              <div 
                key={pkg.id} 
                className={`p-3 mb-2 rounded package-list-item ${selectedServiceId === pkg.id ? 'selected' : ''}`} // UPDATED LINE
                onClick={() => handleSelectForDetail(pkg.id)}
                style={{cursor: 'pointer'}}
              >
                <h5>{pkg.name}</h5>
                <p className="mb-1"><small>{pkg.shortDescription}</small></p>
                <strong>${pkg.price}</strong>
              </div>
            ))}
          </Col>
          <Col md={8}>
            {currentService && currentService.type === 'package' ? (
              <PackageDetail packageInfo={currentService} onBookThisPackage={onSelectService} />
            ) : (
              <p>Select a package to see details.</p>
            )}
          </Col>
        </Row>
      )}

      {activeTab === 'quick' && (
        <div>
          <h4 className="mb-3">Quick & Same-Day Services</h4>
          <Row>
          {quickServices.map(service => (
            <Col md={6} lg={4} key={service.id} className="mb-3 d-flex"> {/* Added d-flex for consistent card heights if using Bootstrap's flex utilities */}
              {/* UPDATED LINE BELOW - added 'quick-service-item-card' and removed h-100 from here to be controlled by CSS */}
              <div className="card quick-service-item-card"> 
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{service.name}</h5>
                  <p className="card-text flex-grow-1">{service.description}</p>
                  <p className="card-text"><strong>Price: ${service.price}</strong> | Duration: {service.duration}</p>
                  {/* Ensure this button uses the class targeted by CSS, e.g., btn-accent-primary or btn-primary if globally styled */}
                  <button className="btn btn-accent-primary mt-auto" onClick={() => onSelectService(service.id)}>
                    Book Now
                  </button>
                </div>
              </div>
            </Col>
          ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default ServicesPage;