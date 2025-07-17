import React, { useEffect, useRef, useContext, useState } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaUser, FaPen, FaTimes } from 'react-icons/fa';

import logo from "../../assets/images/logo.png";
import "./header.css";

import { AuthContext } from './../../context/AuthContext';

const nav__links = [
  { path: '/home', display: 'Home' },
  { path: '/about', display: 'About' },
  { path: '/tours', display: 'Tours' },
  { path: '/contact', display: 'Contact' },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  // profile modal state
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.username || '',
    email: user?.email || '',
    mobile: ''
  });

  // toggle profile overlay
  const toggleProfileModal = () => setShowProfileModal(!showProfileModal);

  // handle individual field updates
  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // "Save Change" click
  const handleSave = () => {
    console.log("Profile saved:", profile);
    toggleProfileModal();
  };

  // log out
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  // sticky header
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // mobile menu toggle
  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');
  const handleMyBookings = () => navigate('/my-bookings');

  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className='nav__wrapper d-flex aligh-items-center justify-content-between'>

            {/* Logo */}
            <div className='logo'>
              <img src={logo} alt='Yatra Nepal Logo' />
            </div>

            {/* Nav links */}
            <div className='naviagtion' ref={menuRef} onClick={toggleMenu}>
              <ul className='menu d-flex align-items-center gap-5'>
                {nav__links.map((item, idx) => (
                  <li className='nav__item' key={idx}>
                    <NavLink
                      to={item.path}
                      className={navClass => navClass.isActive ? "active__link" : ""}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side buttons */}
            <div className='nav__right d-flex align-items-center gap-4'>
              <div className='nav__btns d-flex align-items-center gap-4'>
                {user ? (
                  <>
                    {/* User dropdown */}
<div
  className="dropdown-container"
  onMouseEnter={() => document.getElementById("user-dropdown").style.display = "block"}
  onMouseLeave={() => document.getElementById("user-dropdown").style.display = "none"}
>
  <span className="user-text" onClick={toggleProfileModal}>
    Hello {user.username}
  </span>
  <span className="dropdown-icon">
    {/* 10×6 chevron pointing down */}
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>

  <div id="user-dropdown" className="dropdown-menu">
    <p onClick={handleMyBookings}>My Bookings</p>
  </div>
</div>

                    <Button className="btn btn-dark" onClick={logout}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
              <span className='mobile__menu' onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>

          </div>
        </Row>
      </Container>

      {/* ===== Profile Overlay ===== */}
      {showProfileModal && (
        <div className="profile-overlay" onClick={toggleProfileModal}>
          <div className="profile-modal" onClick={e => e.stopPropagation()}>

            {/* Header block */}
            <div className="profile-header">
              <div className="avatar-container">
                <div className="profile-icon">
                  <FaUser />
                </div>
                <label htmlFor="profile-pic" className="edit-icon">
                  <FaPen />
                </label>
                <input
                  type="file"
                  id="profile-pic"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={e => console.log(e.target.files[0])}
                />
              </div>

              <div className="user-info">
                <h3>{profile.name}</h3>
                <h2>{profile.email}</h2>
              </div>

              <button className="close-btn" onClick={toggleProfileModal}>
                <FaTimes />
              </button>
            </div>

            {/* Editable fields */}
            <div className="profile-field">
              <label>Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={e => handleChange('name', e.target.value)}
              />
            </div>
            <div className="profile-field">
              <label>Email account</label>
              <input
                type="email"
                value={profile.email}
                onChange={e => handleChange('email', e.target.value)}
              />
            </div>
            <div className="profile-field">
              <label>Mobile number</label>
              <input
                type="tel"
                placeholder="Add number"
                value={profile.mobile}
                onChange={e => handleChange('mobile', e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="profile-actions">
              <button className="save-btn" onClick={handleSave}>Save Changes</button>
              <button className="cancel-btn" onClick={toggleProfileModal}>Cancel</button>
            </div>

          </div>
        </div>
      )}

    </header>
  );
};

export default Header;