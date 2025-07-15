import React from "react";
import { Container, Row, Col } from "reactstrap";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import "../styles/about.css";

import aboutImg from "../assets/images/about.jpg";

const About = () => {
  return (
    <>
      {/* === About Intro === */}
      <section className="about__section">
        <Container>
          <Row className="align-items-center">
            <Col lg="6">
              <h2>Who We Are?</h2>
              <p>
                Yatra Nepal is your trusted travel companion dedicated to making 
                your journey through Nepal seamless and memorable. Whether you're a 
                solo adventurer, a family on vacation, or a group of friends seeking 
                exploration, we cater to all your travel needs.
                <br></br>
                Our platform offers a comprehensive range of services, including 
                bus and flight reservations, tour packages, and vehicle rentals. With a 
                user-friendly interface, you can effortlessly plan and book your entire 
                trip in one place.
                <br></br>
                We are committed to providing competitive prices, secure transactions, and 
                exceptional customer support. Our goal is to showcase the beauty of Nepal 
                and help you discover its hidden gems with ease and confidence.
                <br></br>
                <br></br>
              </p>
              <h6>
                Let Yatra Nepal be your guide to unforgettable experiences in the heart of the Himalayas!
              </h6>
            </Col>
            <Col lg="6">
              <img src={aboutImg} alt="About Us" className="about__img" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* === Why Travel With Us === */}
      <section className="why__section">
        <div className="why__wrapper">
          <h2 className="section__title text-center mb-4">Why Travel With Us?</h2>
          <Row className="justify-content-center">
            <Col lg="3" md="4" sm="6" className="mb-4">
              <div className="why__card">
                <i className="ri-earth-line"></i>
                <h5>Local Expertise</h5>
                <p>Guided by locals who know Nepal inside out.</p>
              </div>
            </Col>
            <Col lg="3" md="4" sm="6" className="mb-4">
              <div className="why__card">
                <i className="ri-shield-check-line"></i>
                <h5>Safe & Secure</h5>
                <p>Safety and comfort are always guaranteed.</p>
              </div>
            </Col>
            <Col lg="3" md="4" sm="6" className="mb-4">
              <div className="why__card">
                <i className="ri-heart-2-line"></i>
                <h5>Unforgettable Memories</h5>
                <p>Every journey becomes a story to tell.</p>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* === Gallery === */}
      <section className="gallery__section">
        <Container>
          <h2 className="section__title text-center mb-4">
            "Momento of Memories"<br></br><br></br>
          </h2>
          <Row>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;
