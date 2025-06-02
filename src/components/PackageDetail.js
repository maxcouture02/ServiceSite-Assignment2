import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';

const PackageDetail = ({ packageInfo, onBookThisPackage }) => {
  if (!packageInfo) return <p>Package not found.</p>;

  return (
    <Card className="package-detail-card shadow-sm">
      <Card.Header as="h4" className="bg-accent-sage text-white">{packageInfo.name}</Card.Header>
      <Card.Body>
        <Card.Text className="text-muted" style={{ fontSize: '1.1rem' }}>
          {packageInfo.fullDescription}
        </Card.Text>
        <h5 className="accent-mustard mt-3">Price: ${packageInfo.price}</h5>
        <p className="text-muted"><em>Typical Duration: {packageInfo.duration}</em></p>
        
        {packageInfo.items && packageInfo.items.length > 0 && (
          <>
            <h6 className="mt-4">What's Included:</h6>
            <ListGroup variant="flush" className="mb-3">
              {packageInfo.items.map((item, index) => (
                <ListGroup.Item key={index} className="border-0 px-0 py-1">{item}</ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
        
        <p className="text-sage fst-italic mt-3">
          <small>Saturday & Sunday slots book quickly—select below to guarantee your spot!</small>
        </p>
        <Button 
          variant="primary" 
          className="btn-accent-blue w-100 mt-3"
          onClick={() => onBookThisPackage(packageInfo.id)}
        >
          Schedule This Tune-Up
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PackageDetail;