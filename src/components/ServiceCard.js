import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ServiceCard = ({ service, onBook, onLearnMore, isQuickService = false }) => {
  const { name, shortDescription, description, price, icon } = service;

  return (
    <Card className={`mb-4 service-card ${isQuickService ? 'highlighted' : ''}`} onClick={isQuickService && onBook ? () => onBook(service.id) : null}>
      <Card.Body>
        {icon && <div className="mb-2">{/* You can use an <img> or an icon component here */} <span role="img" aria-label={name}>🚲</span> </div>}
        <Card.Title as="h5">{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">${price}</Card.Subtitle>
        <Card.Text>
          {isQuickService ? description : shortDescription}
        </Card.Text>
        {isQuickService ? (
          <Button variant="primary" className="btn-accent-blue w-100" onClick={(e) => { e.stopPropagation(); onBook(service.id); }}>
            Book It Now
          </Button>
        ) : (
          <Button variant="outline-secondary" className="text-sage" onClick={(e) => { e.stopPropagation(); onLearnMore(service.id); }}>
            Learn More
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;