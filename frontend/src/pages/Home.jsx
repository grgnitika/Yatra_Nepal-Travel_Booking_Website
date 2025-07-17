import React from "react";
import '../styles/home.css';

import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpeg';
import heroVideo from '../assets/images/hero-video.mp4';
import experienceImg from '../assets/images/experience.png';

import Subtitle from './../shared/Subtitle';

import SearchBar from '../shared/SearchBar';
import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";
import Newsletter from "../shared/Newsletter";

const Home = () => {
  return <>
  
  { /*===============hero section start=================*/}
  <section>
    <Container>
      <Row>
        <Col lg='6'>
        <div className='hero__content'>
          {/* <div className='hero__subtitle d-flex align-items-center'>
            <Subtitle subtitle={"Yatra Nepal"} />
            <img src={worldImg} alt='' />
          </div> */}
          <h3>
            Your Gateway to Exploring{""}
            <span className='highlight'> Nepal</span>
          </h3>
          <p>
            Welcome to Yatra Nepal, your trusted travel companion for exploring the diverse 
            landscapes, rich cultures, and hidden gems of Nepal. Whether you're planning a 
            peaceful getaway in the mountains, a cultural tour through historic cities, or 
            an adventure-packed trek, we make it easy to find, compare, and book the perfect 
            travel experience. Our platform is designed to connect you with authentic local 
            tours and trusted guides, ensuring every journey is safe, smooth, and unforgettable. 
          </p>
        </div>
        </Col>

        <Col lg='2'>
        <div className='hero__img-box'>
          <img src={heroImg} alt='' />
        </div>
        </Col>
        <Col lg='2'>
        <div className='hero__img-box hero__video-box mt-4'>
          <video src={heroVideo} alt='' controls/>
        </div>
        </Col>
        <Col lg='2'>
        <div className='hero__img-box mt-5'>
          <img src={heroImg02} alt='' />
        </div>
        </Col>

        <SearchBar/>
      </Row>
    </Container>
  </section>
  { /*===============hero section end=================*/}
  <section>
    <Container>
      <Row>
        <Col lg="3">
          <h5 className='services__subtitle'>What we serve?</h5><br></br>
          <h2 className='services__title'>We offer our best services</h2>
        </Col>
        <ServiceList />
      </Row>
    </Container>
  </section>

  { /*===============Featured tour section start=================*/}
  <section>
    <Container>
      <Row>
        <Col lg='12' className="mb-5">
         {/* <Subtitle subtitle={"Explore"}/> */}
         <h2 className="featured__tour-title">Our Featured Tours</h2>
        </Col>
        <FeaturedTourList />
      </Row>
    </Container>
  </section>
  { /*===============Featured tour section end=================*/}


  { /*=================Testimonial section start====================*/}
  <section>
    <Container>
      <Row>
        <Col lg='12'>
          <h2 className="testimonial__title">What our clients are saying about us?</h2>
        </Col>
        <Col lg="12">
          <Testimonials />
        </Col>
      </Row>
    </Container>
  </section>
  { /*===================Testimonial section end====================*/}
  <Newsletter />
  </>
};

export default Home;