// import React, { useState, useContext } from 'react';

// import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
// import { Link, useNavigate, Navigate } from 'react-router-dom';
// import '../styles/login.css';

// import registerImg from '../assets/images/register.png';
// import userIcon from '../assets/images/user.png';

// import { AuthContext } from './../context/AuthContext';
// import { BASE_URL } from './../utils/config';

// const Register = () => {

//   const { credentials, setCredentials } = useState({
//     userName: undefined,
//     email: undefined,
//     password: undefined,
//   });

//   const { dispatch } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = e => {
//     setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const handleClick = async e => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${BASE_URL}/auth/register`, {
//         method: 'post',
//         headers: {
//           'content-type': 'application/json',
//         },
//         body: JSON.stringify(credentials),
//       });
//       const result = await res.json();

//       if(!res.ok) alert(result.message);

//       dispatch({type: 'REGISTER_SUCCESS'});
//       Navigate('/login');

//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <section>
//       <Container>
//         <Row>
//           <Col lg='8' className='m-auto'>
//           <div className="login__container d-flex justify-content-between">
//             <div className="login__img">
//               <img src={registerImg} alt='' />
//             </div>

//             <div className="login__form">
//               <div className='user'>
//                 <img src={userIcon} alt='' />
//               </div>
//               <h2>Register</h2>

//               <Form onSubmit={handleClick}>
//                 <FormGroup>
//                   <input type="text" placeholder="Username" required id="username"
//                   onChange={handleChange} />
//                 </FormGroup>
//                 <FormGroup>
//                   <input type="password" placeholder="Password" required id="password"
//                   onChange={handleChange} />
//                 </FormGroup>
//                 <Button className="btn secondary__btn auth__btn"
//                 type="submit">Create Account</Button>
//               </Form>
//               <p>Already have an account? <Link to='/login'>Login</Link></p>
//             </div>
//           </div>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default Register;

import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

import { AuthContext } from './../context/AuthContext';
import { BASE_URL } from './../utils/config';

// ✅ Add these Toastify imports:
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const result = await res.json();

      if (!res.ok) return toast.error(result.message);

      dispatch({ type: 'REGISTER_SUCCESS' });

      // ✅ Show success toast:
      toast.success('✅ Account created successfully!');

      // ✅ Delay navigate so user can see toast:
      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="auth__background">
      <Container>
        <Row className="justify-content-center">
          <Col lg="5">
            <div className="auth__form">
              <h2>Create Account</h2>
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
                    type="email"
                    placeholder="Email Address"
                    required
                    id="email"
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
                <Button className="btn auth__btn" type="submit">
                  Sign Up
                </Button>
              </Form>
              <p>Already have an account? <Link to='/login'>Log In</Link></p>
            </div>
          </Col>
        </Row>
      </Container>
      {/* ✅ Add ToastContainer */}
      <ToastContainer />
    </section>
  );
};

export default Register;

