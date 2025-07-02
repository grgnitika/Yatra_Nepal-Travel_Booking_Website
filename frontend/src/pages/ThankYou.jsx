import React from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import '../styles/thank-you.css';

const ThankYou = () => {
  return (
    <section className="thank__you__section">
      <Container>
        <Row className="justify-content-center">
          <Col lg='12'>
            <div className="thank__you text-center">
              <span>
                <i className="ri-checkbox-circle-line"></i>
              </span>
              <h1 className="mb-3 fw-semibold">Thank You</h1>
              <h3 className="mb-4">your tour is booked.</h3>

              <Button className="btn primary__btn w-25">
                <Link to="/home">Back to Home</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;
