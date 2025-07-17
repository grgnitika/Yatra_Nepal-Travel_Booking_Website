// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../utils/config"; // make sure this is e.g. "http://localhost:4000/api/v1"

import "react-toastify/dist/ReactToastify.css";
import "../styles/login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter your email.");
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",      // if your server uses cookies
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to send reset link.");
      }
    } catch (err) {
      console.error("ForgotPassword error:", err);
      toast.error("Network error, please try again.");
    } finally {
      setLoading(false);
      setEmail("");
    }
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
                No worries, we’ll send you reset instructions.
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
                <Button
                  className="btn auth__btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Reset Password"}
                </Button>
              </Form>
              <p>
                <Link to="/login">← Back to Login</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-center" />
    </section>
  );
};

export default ForgotPassword;
