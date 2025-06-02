import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Urban Wheel</h5>
            <p>Your trusted partner for all bicycle repair and maintenance needs.</p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-geo-alt-fill"></i> 123 Main St., Suite 4, Cityville</li>
              <li><i className="bi bi-telephone-fill"></i> (555) 012-3456</li>
              <li><i className="bi bi-envelope-fill"></i> contact@urbanwheel.example.com</li>
              <li>Open until 8 PM today</li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>More Info</h5>
            <ul className="list-unstyled">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><p className="mt-2 mb-0">Site designed by: Your Name/Company</p></li>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="text-center">
            <small>© {new Date().getFullYear()} Urban Wheel. All Rights Reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;