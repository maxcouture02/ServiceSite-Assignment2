import React from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ConfirmationPage = ({ bookingDetails }) => {
  if (!bookingDetails) {
    return (
      <Container className="text-center mt-5">
        <h2>Oops! Something went wrong.</h2>
        <p>We couldn't find your booking details. Please try again.</p>
        <Link to="/" className="btn btn-primary btn-accent-blue">Go to Homepage</Link>
      </Container>
    );
  }

  const { service, date, time } = bookingDetails;
  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString('en-US', { // Add T00:00:00 to avoid timezone issues if date is just YYYY-MM-DD
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  // time is already formatted from BookingPage if passed correctly, or format here if it's e.g. "13:00"
  const formattedTime = time.includes("AM") || time.includes("PM") ? time : new Date(`1970-01-01T${time}:00`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });


  const isTuneUp = service.type === 'package'; 

  const handleAddToCalendar = () => {
    // placeholder
    alert('Calendar invite download started (placeholder).');
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={7}>
          <div className="confirmation-card text-center">
            <div className="mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#28a745" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
            </div>
            <h2 className="mb-3">
              {isTuneUp ? `Thank You, Your Tune-Up is Scheduled!` : "Booking Confirmed!"}
            </h2>
            
            <ListGroup variant="flush" className="my-4 text-start">
              <ListGroup.Item><strong>Service:</strong> {service.name}</ListGroup.Item>
              <ListGroup.Item><strong>Date:</strong> {formattedDate}</ListGroup.Item>
              <ListGroup.Item><strong>Time:</strong> {formattedTime}</ListGroup.Item>
              <ListGroup.Item><strong>Location:</strong> 123 Main St., Suite 4, Ottawa</ListGroup.Item>
            </ListGroup>

            <Row className="my-4 align-items-center">
                <Col md={5} className="text-center mb-3 mb-md-0">
                    <img src="/images/map-snippet.png" alt="Shop location map snippet" className="img-fluid map-snippet"/>
                </Col>
                <Col md={7}>
                    <h5>Drop-Off Instructions:</h5>
                    <ul className="list-unstyled text-start small">
                        <li><i className="bi bi-clock text-sage me-2"></i>Arrive at 123 Main St. by {new Date(new Date(`1970-01-01T${time}:00`).getTime() - 15*60000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })} for drop-off.</li>
                        <li><i className="bi bi-building text-sage me-2"></i>On-site waiting area available.</li>
                        <li><i className="bi bi-hourglass-split text-sage me-2"></i>Estimated service time: {service.duration}.</li>
                    </ul>
                </Col>
            </Row>


            <Button variant="primary" className="btn-accent-blue me-2 mb-2" onClick={handleAddToCalendar}>
              Add to Calendar
            </Button>
            <Button variant="outline-secondary" as={Link} to="/my-appointments" className="text-sage mb-2">
              View My Appointments
            </Button>

            {isTuneUp && (
                <div className="mt-4">
                    <Link to="/services" className="text-sage">Need a kid’s tune-up too? Click here.</Link>
                </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmationPage;