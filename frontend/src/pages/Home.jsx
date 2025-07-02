import React from "react";
import '../styles/home.css';

import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpeg';
import heroVideo from '../assets/images/hero-video.mp4';
import worldImg from '../assets/images/world.png';
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
          <div className='hero__subtitle d-flex align-items-center'>
            <Subtitle subtitle={"Know Before You Go"} />
            <img src={worldImg} alt='' />
          </div>
          <h1>
            Your Gateway to Exploring Nepal{""}
            <span className='highlight'> memories</span>
          </h1>
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
        <div className='hero__img-box mt-4'>
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
          <h5 className='services__subtitle'>What we serve</h5>
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
         <Subtitle subtitle={"Explore"}/>
         <h2 className="featured__tour-title">Our Featured Tours</h2>
        </Col>
        <FeaturedTourList />
      </Row>
    </Container>
  </section>
  { /*===============Featured tour section end=================*/}

  { /*===============Experience section start==================*/}
  <section>
    <Container>
      <Row>
        <Col lg='6'>
        <div className="experience__content">
          <Subtitle subtitle={"Experience"} />

          <h2>
            With our all experience <br /> we will serve you
          </h2>
          <p>
            Lorem ipsum bsbs jsjsj hello traveller.
            <br />
            Lorem ipsum bsbs jsjsj hello traveller.
          </p>
        </div>

        <div className="counter__wrapper d-flex align-items-center gap-5">
          <div className="counter__box">
            <span>12k+</span>
            <h6>Successful trip</h6>
          </div>
          <div className="counter__box">
            <span>2k+</span>
            <h6>Regular clients</h6>
          </div>
          <div className="counter__box">
            <span>15</span>
            <h6>Years experience</h6>
          </div>
        </div>
        </Col>
        <Col lg='6'>
          <div className="experience__img">
            <img src={experienceImg} alt="" />
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  { /*===============Experience section end====================*/}

  { /*===============Gallery section start====================*/}
  <section>
    <Container>
      <Row>
        <Col lg='12'>
          <Subtitle subtitle={'Gallery'}/>
          <h2 className="gallery__title">
            Visit our customers tour gallery
          </h2>
        </Col>
        <Col lg='12'>
        <MasonryImagesGallery />
        </Col>
      </Row>
    </Container>
  </section>
  { /*=================Gallery section end====================*/}

  { /*=================Testimonial section start====================*/}
  <section>
    <Container>
      <Row>
        <Col lg='12'>
          <Subtitle subtitle={'Fans Love'} />
          <h2 className="testimonial__title">What our fans say about us</h2>
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