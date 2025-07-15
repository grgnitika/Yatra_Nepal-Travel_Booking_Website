import React, { useState } from 'react';
import './newsletter.css';

import { Container, Row, Col } from 'reactstrap';
import maleTourist from '../assets/images/male-tourist.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast.error('Please enter your email!');
      return;
    }

    // ✅ Optionally: add simple email format check
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address!');
      return;
    }

    // ✅ Show success toast
    toast.success('Subscribed successfully!');
    setEmail('');
  };

  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe to Yatra Nepal now!</h2>

              <div className="newsletter__input">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="btn newsletter__btn"
                  onClick={handleSubscribe}
                >
                  Subscribe
                </button>
              </div>

              <p>
                Subscribe to get information, latest news and other
                interesting offers about Yatra Nepal.
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>

      {/* ✅ Add ToastContainer once here */}
      <ToastContainer />
    </section>
  );
};

export default Newsletter;
