import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Newsletter from "../shared/Newsletter";
import "../styles/contact.css"; 

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Your message has been sent!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* === Contact Banner === */}
      <section className="contact__banner">
        <Container>
          <h2 className="text-center">Contact Us</h2>
        </Container>
      </section>

      {/* === Contact Section === */}
      <section className="contact__section">
        <Container>
          <Row>
            {/* Contact Form */}
            <Col lg="6" md="12">
              <div className="contact__form">
                <h3>Get In Touch!</h3>
                <p>Fill up the form and our Team will get back to you within 24 hours.</p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                  <button type="submit" className="send__btn">Send Message</button>
                </form>
              </div>
            </Col>

            {/* Contact Details */}
            <Col lg="6" md="12">
              <div className="contact__details">
                <h4>Contact Us</h4>
                <p>We're here to help you plan your perfect trip. Reach out to us anytime!</p>
                <p><strong>📞 Phone Support:</strong> +0123478</p>
                <p><strong>📧 Email Support</strong></p>
                <p><strong>General Inquiries:</strong> info@yatranepal.com</p>
                <p><strong>Booking Support:</strong> support@yatranepal.com</p>
                <p><strong>🏢 Our Office: </strong> 
                Yatra Nepal Pvt. Ltd., Dillibazar, Kathmandu, Nepal</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* === Newsletter Section === */}
      <Newsletter />
      
      {/* === Toast Container === */}
    </>
    
  );
};

export default Contact;
