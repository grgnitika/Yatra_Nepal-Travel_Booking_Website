import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/login.css';

import { AuthContext } from './../context/AuthContext';
import { BASE_URL } from './../utils/config';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) return toast.error(result.message);

      dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });

      toast.success('✅ Login successful!');

      const redirectPath = location.state?.from || '/';

      setTimeout(() => {
        navigate(redirectPath);
      }, 1500);

    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
      toast.error(err.message);
    }
  };

  return (
    <section className="auth__background">
      <Container>
        <Row className="justify-content-center">
          <Col lg="5">
            <div className="auth__form">
              <h2>Login</h2>
              <Form onSubmit={handleClick}>
                <FormGroup>
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    id="username"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    id="password"
                    onChange={handleChange}
                  />
                </FormGroup>
                {/* ✅ Forgot password link just below password input */}
                <div className="forgot-password-link">
                  <Link to="/forgot-password">Forgot your password?</Link>
                </div>
                <Button className="btn auth__btn" type="submit">
                  Sign In
                </Button>
              </Form>
              <p>Don’t have an account? <Link to='/register'>Register</Link></p>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </section>
  );
};

export default Login;
