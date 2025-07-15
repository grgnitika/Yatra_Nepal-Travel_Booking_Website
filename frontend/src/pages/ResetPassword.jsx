import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { toast, ToastContainer } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    if (!password || !confirm) {
      toast.error("Please fill out both fields.");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match!");
      return;
    }

    // TODO: Send to backend here
    toast.success("✅ Password has been reset!");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
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
              <h2>Set New Password</h2>
              <p style={{ textAlign: "center" }}>
                Your new password must be different from previously used
                passwords.
              </p>
              <Form onSubmit={handleReset}>
                <FormGroup>
                  <input
                    type="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
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

export default ResetPassword;
