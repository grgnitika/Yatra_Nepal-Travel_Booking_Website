import React, { useContext, useState, useRef } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";

import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const location = useLocation(); 

  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
    transportation: "By Air",
  });

  const [showConfirm, setShowConfirm] = useState(false);

  const dateRef = useRef();

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const transportCost = booking.transportation === "By Air" ? 200 : 100;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee) + 
    Number(transportCost);

  const handleClick = (e) => {
  e.preventDefault();

  // ✅ CHECK REQUIRED FIELDS
  if (
    !booking.fullName.trim() ||
    !booking.phone ||
    !booking.bookAt ||
    !booking.guestSize
  ) {
    alert("Please fill in all required fields before booking.");
    return;
  }

  // ✅ If all fields are valid, show confirmation modal
  setShowConfirm(true);
};


  const handleConfirmBooking = async () => {
  try {
    if (!user) {
      alert("Please login");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    const res = await fetch(`${BASE_URL}/booking`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(booking),
    });

    const result = await res.json();

    if (!res.ok) {
      return alert(result.message);
    }

    console.log("Booking successful! Navigating to thank you page...");
    setShowConfirm(false);
    setTimeout(() => {
      navigate("/thank-you");
    }, 50);

  } catch (err) {
    alert(err.message);
  }
};



  return (
    <div className="booking-wrapper">
      <div className={`booking ${showConfirm ? "blurred" : ""}`}>
        <div className="booking__top d-flex align-items-center justify-content-between">
          <h3>
            ${price} <span>/per person</span>
          </h3>
          <span className="tour__rating d-flex align-items-center ">
            <i className="ri-star-fill"></i>
            {avgRating === 0 ? null : avgRating} ({reviews?.length})
          </span>
        </div>

        <div className="booking__form">
          <h5>Information</h5>
          <Form className="booking__info-form" onSubmit={handleClick}>
            <FormGroup>
              <input
                type="text"
                placeholder="Full Name"
                id="fullName"
                required
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <input
                type="number"
                placeholder="Phone Number"
                id="phone"
                required
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className="d-flex align-items-center gap-3">
              <div className="date__input d-flex align-items-center gap-2">
                <span
                  onClick={() => dateRef.current.showPicker()}
                  style={{ cursor: "pointer" }}
                >
                  <i className="ri-calendar-line"></i>
                </span>
                <input
                  type="date"
                  id="bookAt"
                  ref={dateRef}
                  min="2025-08-12"   
                  max="2025-08-29" 
                  required
                  onChange={handleChange}
                />
              </div>
              <input
                type="number"
                placeholder="Guest"
                id="guestSize"
                required
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <select
                id="transportation"
                onChange={handleChange}
                value={booking.transportation}
                required
              >
                <option value="By Air">By Air</option>
                <option value="By Bus">By Bus</option>
              </select>
            </FormGroup>
          </Form>
        </div>

        <div className="booking__bottom">
          <ListGroup>
            <ListGroupItem className="border-0 px-0">
              <h5 className="d-flex align-items-center gap-1">
                ${price} <i className="ri-close-line"></i> 1 person
              </h5>
              <span> ${price}</span>
            </ListGroupItem>
            <ListGroupItem className="border-0 px-0">
              <h5>Service Charge</h5>
              <span> ${serviceFee}</span>
            </ListGroupItem>
            <ListGroupItem className="border-0 px-0">
              <h5>Transportation Cost</h5>
              <span> ${transportCost}</span>
              </ListGroupItem>
            <ListGroupItem className="border-0 px-0 total">
              <h5>Total</h5>
              <span> ${totalAmount}</span>
            </ListGroupItem>
          </ListGroup>

          <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
            Book Now
          </Button>
        </div>
      </div>

      {showConfirm && (
        <div className="confirm-modal">
          <div className="confirm-box">
            <button className="close-btn" onClick={() => setShowConfirm(false)}>×</button>
            <h4>Are you sure you want to book this tour?</h4>
            <div className="confirm-actions">
              <Button className="btn primary__btn" onClick={handleConfirmBooking}>
                Yes
              </Button>
              <Button className="btn secondary__btn" onClick={() => setShowConfirm(false)}>
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;

