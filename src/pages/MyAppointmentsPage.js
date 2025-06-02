import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyAppointmentsPage = () => {
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">My Appointments</h1>
      <Alert variant="info">
        This page is a placeholder. In a full application, you would see a list of your past and upcoming appointments.
      </Alert>
      <div className="text-center">
        <p>No appointments to display in this prototype.</p>
        <Link to="/" className="btn btn-primary btn-accent-blue">Go to Homepage</Link>
      </div>
    </Container>
  );
};

export default MyAppointmentsPage;