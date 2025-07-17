import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../utils/config";   // adjust import path if needed
import "react-toastify/dist/ReactToastify.css";
import "../styles/login.css";

const ResetPassword = () => {
  const { token }   = useParams();
  const navigate    = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [loading, setLoading]   = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirm) {
      toast.error("Please fill out both fields.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ newPassword: password }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "✅ Password has been reset!");
        setTimeout(() => navigate("/login"), 1800);
      } else {
        toast.error(data.message || "Invalid or expired link.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
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

              <h2>Set New Password</h2>
              <p style={{ textAlign: "center" }}>
                Your new password must be different from previous ones.
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
                <Button
                  className="btn auth__btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Saving…" : "Reset Password"}
                </Button>
              </Form>

              <p style={{ marginTop: "1rem" }}>
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

export default ResetPassword;
