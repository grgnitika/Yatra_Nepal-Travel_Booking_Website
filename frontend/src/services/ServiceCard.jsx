import React from 'react'
import "./service-card.css";
import { Link } from 'react-router-dom';

const ServiceCard = ({ item }) => {
  const { imgUrl, title, desc } = item; 

  return (
    <div className='service__item'>
        <div className='service__img'>
            <img src={imgUrl} alt='' />
        </div>
        <h5>{title}</h5>
        <p>{desc}</p>
        <Link to="/about" className="learn__more-btn">Learn More</Link>
    </div>
  );
};

export default ServiceCard;