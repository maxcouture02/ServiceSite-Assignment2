import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { findServiceById } from '../servicesData';
import AppointmentSummary from '../components/AppointmentSummary';

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDateString = () => {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const todayLocal = new Date(today.getTime() - (offset*60*1000));
  return todayLocal.toISOString().split('T')[0];
};

// Helper function to generate time slots
const generateTimeSlots = (serviceDate) => {
  const slots = [];
  const now = new Date();
  const selectedDay = new Date(serviceDate + "T00:00:00"); // Ensure selectedDate is treated as local

  // Only show future slots or slots for today if they haven't passed
  const startHour = (selectedDay.toDateString() === now.toDateString() && now.getHours() >= 9) ? now.getHours() + 1 : 9;

  for (let hour = startHour; hour <= 17; hour++) { // Example: 9 AM to 5 PM
      if (selectedDay.toDateString() === now.toDateString() && hour <= now.getHours()) {
          continue; // Skip past hours for today
      }
      // Show slots like 10:00 AM, 1:00 PM, 4:00 PM as in storyboard
      if (hour === 10 || hour === 13 || hour === 16) {
        slots.push(`${hour}:00`);
      }
  }
  // Add specific slots from storyboard for today or future if not generated above
  const specificSlots = ["10:00 AM", "1:00 PM", "4:00 PM"];
  specificSlots.forEach(s => {
    const [hrStr] = s.split(':');
    const hr = parseInt(hrStr);
    if ( (selectedDay.toDateString() === now.toDateString() && hr > now.getHours()) || selectedDay > now) {
        if(!slots.includes(s.replace(" AM", "").replace(" PM", ""))) { // Avoid duplicates if logic above added it
            // Reformat to 24h to match current logic, or adjust generation
            const formattedHour = s.includes("PM") && hr !== 12 ? hr + 12 : hr;
            if (!slots.includes(`${formattedHour}:00`)) slots.push(`${formattedHour}:00`);
        }
    }
  });
  // Sort and unique
  return [...new Set(slots.sort((a,b) => parseInt(a) - parseInt(b)))];
};


const BookingPage = ({ onConfirmBooking }) => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const serviceData = findServiceById(serviceId);
    if (serviceData) {
      setService(serviceData);
      if (serviceData.isSameDay) {
        setSelectedDate(getTodayDateString());
      }
    } else {
      navigate('/'); // Service not found, redirect
    }
  }, [serviceId, navigate]);

  useEffect(() => {
    if (selectedDate) {
      setAvailableTimes(generateTimeSlots(selectedDate));
      setSelectedTime(''); // Reset time when date changes
      setShowSummary(false);
    }
  }, [selectedDate, service]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowSummary(true);
  };

  const handleConfirm = () => {
    if (service && selectedDate && selectedTime) {
      onConfirmBooking(service.id, selectedDate, selectedTime);
    }
  };

  if (!service) {
    return <p>Loading service details...</p>;
  }
  
  // For Jennifer's persona: filter calendar for weekends if it's a package
  const isWeekendBookingPreferred = service.type === 'package';
  const dateInputFilter = (dateStr) => {
    if (!isWeekendBookingPreferred) return true; // No filter if not a package
    const day = new Date(dateStr + "T00:00:00").getDay(); // Ensure local interpretation
    return day === 6 || day === 0; // 0 is Sunday, 6 is Saturday
  };


  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="my-4 text-center">Book: <span className="accent-blue">{service.name}</span></h1>
          <p className="text-center text-muted">Price: ${service.price} | Duration: {service.duration}</p>

          {/* Placeholder for James's "Your Bike Details" */}
          {service.isSameDay && ( // Assuming tech-savvy James books same-day quick services
            <div className="bike-details-placeholder my-4">
              <h5>Your Bike Details (Demo)</h5>
              <p className="mb-1"><strong>Bike Model:</strong> Trek FX 2 (Assumed for returning user)</p>
              <p className="mb-1"><strong>Previous Services:</strong> Last serviced Apr 2 (Demo)</p>
            </div>
          )}
          
          <Form>
            <Form.Group as={Row} className="mb-3 align-items-center calendar-container">
              <Form.Label column sm="3">Select Date:</Form.Label>
              <Col sm="9">
                <Form.Control 
                  type="date" 
                  value={selectedDate} 
                  onChange={handleDateChange}
                  min={getTodayDateString()} // Prevent booking past dates
                />
                {isWeekendBookingPreferred && <Form.Text className="text-muted">Weekend slots are popular for tune-ups!</Form.Text>}
              </Col>
            </Form.Group>

            {selectedDate && (
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="3">Available Times:</Form.Label>
                <Col sm="9">
                  {availableTimes.length > 0 ? (
                    availableTimes
                      .filter(time => isWeekendBookingPreferred ? true : new Date(`${selectedDate}T${time}`).getDay() !==0 && new Date(`${selectedDate}T${time}`).getDay() !==6) // Filter out weekends for James if not a package
                      .map(time => (
                      <Button 
                        key={time} 
                        variant="outline-primary" 
                        className={`time-slot-btn ${selectedTime === time ? 'active' : ''}`}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {new Date(`1970-01-01T${time}:00`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                      </Button>
                    ))
                  ) : (
                    <p className="text-danger">No slots available for this date. Please try another.</p>
                  )}
                </Col>
              </Form.Group>
            )}
          </Form>
          
          {showSummary && selectedTime && (
             <AppointmentSummary 
                serviceName={service.name}
                date={selectedDate}
                time={new Date(`1970-01-01T${selectedTime}:00`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                onConfirm={handleConfirm}
             />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BookingPage;