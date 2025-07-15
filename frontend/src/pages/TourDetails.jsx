// import React,{ useContext, useEffect, useRef, useState } from "react";
// import '../styles/tour-details.css';
// import { Container, Row, Col, Form, ListGroup } from "reactstrap";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import calculateAvgRating from "../utils/avgRating";
// import avatar from "../assets/images/avatar.jpg";
// import Booking from "../components/Booking/Booking";
// import Newsletter from "../shared/Newsletter";
// import useFetch from "./../hooks/useFetch";
// import { BASE_URL } from "./../utils/config";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// import { AuthContext } from './../context/AuthContext';

// const TourDetails = () => {
//   const { id } = useParams();
//   const reviewMsgRef = useRef("");
//   const [ tourRating, setTourRating ] = useState(null);
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//    const location = useLocation(); 


//   const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

//   const { 
//   photo = "", 
//   title = "", 
//   desc = "", 
//   price = 0, 
//   address = "", 
//   reviews = [], 
//   city = "", 
//   Date, 
//   maxGroupSize = 0 
// } = tour || {};



//   const { totalRating, avgRating } = calculateAvgRating(reviews);

//   const options = { day: "numeric", month: "long", year: "numeric" };

//   const submitHandler = async e => {
//   e.preventDefault();
//   const reviewText = reviewMsgRef.current.value;

//   if (!tourRating) {
//     toast.error("Please select a rating!");
//     return;
//   }

//   try {
//     if (!user) {
//       toast.error("Please login first!");
//       navigate('/login', { state: { from: location.pathname } });
//       return;
//     }

//     const reviewObj = {
//       username: user?.username,
//       reviewText,
//       rating: tourRating,
//     };

//     const res = await fetch(`${BASE_URL}/review/${id}`, {
//       method: 'post',
//       headers: {
//         'content-type': 'application/json',
//       },
//       credentials: 'include',
//       body: JSON.stringify(reviewObj),
//     });

//     const result = await res.json();
//     if (!res.ok) {
//       toast.error(result.message);
//       return;
//     }

//     toast.success(result.message);
//     window.location.reload(); 
//   } catch (err) {
//     toast.error(err.message);
//   }
// };


//   useEffect(() => {
//     window.scrollTo(0,0)
//   }, [tour]);

//   return (
//     <>
//       <section>
//         <Container>
//           {loading && <h4 className="text-center pt-5">Loading.........</h4>}
//           {error && <h4 className="text-center pt-5">{error}</h4>}
//           {!loading && !error && tour && (
//             <Row>
//               <Col lg="8">
//                 <div className="tour__content">
//                   <img src={photo} alt="" />

//                   <div className="tour__info">
//                     <h2>{title}</h2><br></br>

//                     <div className="d-flex align-items-center gap-5">
//                       <span className='tour__rating d-flex align-items-center gap-1'>
//                         <i 
//                           className="ri-star-fill"
//                           style={{ color: "var(--secondary-color)" }}
//                         ></i> 
//                         {avgRating === 0 ? null : avgRating}
//                         {totalRating === 0 ? (
//                           "Not Rated"
//                         ) : (
//                           <span>({reviews?.length})</span>
//                         )}
//                       </span>

//                       <span>
//                         <i className="ri-map-pin-user-fill"></i> {address}
//                       </span>
//                     </div>

//                     <div className="tour__extra-details">
//                       <span><i className="ri-map-pin-2-line"></i> {city}</span>
//                       <span><i className="ri-money-dollar-circle-line"></i> ${price} /per person</span>
                      
//                       <span><i className="ri-group-line"></i> {maxGroupSize} people</span>
//                     </div>
//                     <h5>Description</h5>
//                     <p>{desc}</p>
//                   </div>

//                   {/*===============Tour Reviews section========================*/}
//                   <div className="tour__reviews mt-4">
//                     <h4>Ratings & Reviews ({reviews?.length} reviews)</h4>

//                     <Form onSubmit={submitHandler}>
//                       <div className="d-flex align-items-center gap-3 mb-4 rating__group">
//                         {[1, 2, 3, 4, 5].map(num => (
//                           <span 
//                           key={num}
//                           onClick={() => setTourRating(num)}
//                           style={{ cursor: "pointer" }}
//                           >
//                             <i className={num <= tourRating ? "ri-star-s-fill" : "ri-star-s-line"}></i>
//                             </span>
//                           ))}
//                       </div>

//                       <div className="review__input">
//                         <input type="text" ref={reviewMsgRef} placeholder="share your thoughts"
//                           required />
//                         <button
//                           className="btn primary__btn text-white"
//                           type="submit">
//                           Submit
//                         </button>
//                       </div>
//                     </Form>

//                     <ListGroup className="user__reviews">
//                       {
//                         reviews?.map(review => (
//                           <div className="review__item" key={review._id}>
//                             <img src={avatar} alt="" />
//                             <div className="w-100">
//                               <div className="d-flex align-items-center gap-2 mb-1">
//                                 <h5 className="mb-0">{review.username}</h5>
//                                 <p>
//                                 {new Date("02-18-2025").toLocaleDateString(
//                                   "en-US", 
//                                   options
//                                 )}
//                               </p>
//                               </div>
//                               <span className="d-flex align-items-center">
//                                 {review.rating}
//                                 <i className="ri-star-s-fill"></i>
//                               </span>
//                               <h6>{review.reviewText}</h6>
//                             </div>
//                           </div>
//                         ))
//                       }
//                     </ListGroup>
//                   {/*===============Tour Reviews section end========================*/}
//                   </div>
//                 </div>
//               </Col>

//               <Col lg="4">
//                 <Booking tour={tour} avgRating={avgRating} />
//               </Col>
//             </Row>
//           )}
//         </Container>
//       </section>
//       <Newsletter />
//       <ToastContainer />
//     </>
//   );
// };

// export default TourDetails;

import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from "./../hooks/useFetch";
import { BASE_URL } from "./../utils/config";

import { AuthContext } from "./../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    city,
    date,
    maxGroupSize,
  } = tour || {};

  const { totalRating, avgRating } = calculateAvgRating(reviews || []);

  const options = { day: "numeric", month: "long", year: "numeric" };

  useEffect(() => {
    console.log("Tour:", tour);
    console.log("Reviews:", reviews);
    console.log("Is reviews an Array?", Array.isArray(reviews));
  }, [tour]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!user || user === undefined || user === null) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!tourRating) {
      toast.error("Please rate the tour as well!");
      return;
    }

    try {
      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Failed to submit review.");
        return;
      }

      toast.success("Review submitted successfully!");
      window.location.reload();
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading...</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && tour && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt="" />

                  <div className="tour__info">
                    <h2>{title}</h2>
                    <br />

                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not Rated"
                        ) : (
                          <span>({reviews?.length || 0})</span>
                        )}
                      </span>

                      <span>
                        <i className="ri-map-pin-user-fill"></i> {address}
                      </span>
                    </div>

                    <div className="tour__extra-details">
                      <span>
                        <i className="ri-map-pin-2-line"></i> {city}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i> ${price}{" "}
                        /per person
                      </span>

                      <span>
                        <i className="ri-group-line"></i> {maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>

                  {/* === Tour Reviews === */}
                  <div className="tour__reviews mt-4">
                    <h4>
                      Ratings & Reviews (
                      {Array.isArray(reviews) ? reviews.length : 0} reviews)
                    </h4>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <span key={num} onClick={() => setTourRating(num)}>
                            <i
                              className={
                                num <= tourRating
                                  ? "ri-star-fill"
                                  : "ri-star-line"
                              }
                            ></i>
                          </span>
                        ))}
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Share your thoughts"
                          required
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {reviews?.map((review) => (
                        <div className="review__item" key={review._id}>
                          <img src={avatar} alt="" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between mb-1 flex-wrap">
                              <div className="d-flex align-items-center gap-2 flex-wrap">
                                <h5 className="mb-0">{review.username}</h5>
                                <p
                                  className="mb-0"
                                  style={{
                                    fontSize: "0.85rem",
                                    color: "#777",
                                  }}
                                >
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString("en-US", options)}
                                </p>
                              </div>
                              <span className="d-flex align-items-center gap-1">
                                {[...Array(5)].map((_, index) => (
                                  <i
                                    key={index}
                                    className={
                                      index < review.rating
                                        ? "ri-star-fill"
                                        : "ri-star-line"
                                    }
                                    style={{
                                      color: "var(--secondary-color)",
                                    }}
                                  ></i>
                                ))}
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>

              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
      <ToastContainer />
    </>
  );
};

export default TourDetails;
