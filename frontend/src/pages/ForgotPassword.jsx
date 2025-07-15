import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css"; // Reuse same styling
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    // TODO: Replace with real API call
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    // Simulate sending email
    toast.success("Reset instructions sent to your email!");
    setEmail("");
  };

  return (
    <section className="auth__background">
      <Container>
        <Row className="justify-content-center">
          <Col lg="5">
            <div className="auth__form">
              <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <span
                  style={{
                    display: "inline-block",
                    background: "#fdbb2d",
                    borderRadius: "50%",
                    padding: "0.5rem 0.75rem",
                    fontSize: "1.2rem",
                  }}
                >
                  🔑
                </span>
              </div>
              <h2>Forgot Password</h2>
              <p style={{ textAlign: "center" }}>
                No worries, we'll send you reset instructions.
              </p>
              <Form onSubmit={handleReset}>
                <FormGroup>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <Button className="btn auth__btn" type="submit">
                  Reset Password
                </Button>
              </Form>
              <p>
                <Link to="/login">← Back to Login</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </section>
  );
};

export default ForgotPassword;
