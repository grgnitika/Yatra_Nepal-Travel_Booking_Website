import React from 'react';
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const serviceData =[
    {
        imgUrl: weatherImg,
        title: "Tour Packages",
        desc: "We offer curated travel packages across Nepal’s most stunning destinations..",
      },
      {
        imgUrl: guideImg,
        title: "Transportation Services",
        desc: "We provide safe and comfortable travel options to your selected locations.",    
      },
      {
        imgUrl: customizationImg,
        title: "Travel Assistance",
        desc: "Enjoy end-to-end travel support, from itinerary planning to local guidance..",
      },
]

const ServiceList = () => {
  return (
    <>
    {serviceData.map((item, index) => (
        <Col lg="3" md="6" sm ="12" className="mb-4" key={index}>
            <ServiceCard item={item} />
        </Col>
     ))}
    </>
  );
};

export default ServiceList;