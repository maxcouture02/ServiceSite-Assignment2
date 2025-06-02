import React from 'react';
import { Card, Button } from 'react-bootstrap';

const AppointmentSummary = ({ serviceName, date, time, onConfirm }) => {
  if (!serviceName || !date || !time) return null;

  // Treat `date` as local midnight instead of UTC
  const localDate = new Date(date + "T00:00:00");

  return (
    <Card className="mt-4 bg-light sticky-bottom shadow-lg" style={{ bottom: '1rem', zIndex: 1000 }}>
      <Card.Body className="d-flex justify-content-between align-items-center p-3">
        <div>
          <strong>{serviceName}</strong>
          <p className="mb-0">
            {localDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}{" "}
            at {time}
          </p>
        </div>
        <Button variant="success" className="btn-accent-blue" onClick={onConfirm}>
          Confirm Booking →
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AppointmentSummary;
