import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import { Button } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/my-bookings.css";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // which booking is showing the confirm‐cancel overlay
  const [pendingCancelId, setPendingCancelId] = useState(null);

  // fetch all tours
  const fetchTours = async () => {
    try {
      const res = await fetch(`${BASE_URL}/tours`);
      const result = await res.json();
      if (res.ok) setTours(result.data || []);
    } catch (err) {
      console.error("Error fetching tours:", err);
    }
  };

  // fetch all bookings, then filter to just this user
  const fetchBookings = async () => {
    try {
      const res = await fetch(`${BASE_URL}/booking`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const result = await res.json();
      if (res.ok) {
        setBookings(
          (result.data || []).filter((b) => b.userId === user._id)
        );
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
    fetchBookings();
  }, []);

  // open the confirm overlay
  const onCancelClick = (id) => {
    setPendingCancelId(id);
  };

  // user clicks "Yes" => DELETE and toast
  const confirmCancel = async () => {
    try {
      const res = await fetch(`${BASE_URL}/booking/${pendingCancelId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.filter((b) => b._id !== pendingCancelId)
        );
        toast.success("Booking Cancelled Successfully!");
      } else {
        toast.error("Failed to cancel booking.");
      }
    } catch (err) {
      console.error("Error cancelling booking:", err);
      toast.error("Something went wrong while cancelling.");
    } finally {
      setPendingCancelId(null);
    }
  };

  // user clicks "No" or closes overlay
  const cancelOverlay = () => {
    setPendingCancelId(null);
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="my-bookings-container">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <img src="/no-bookings.jpg" alt="No bookings" />
          <p>
            You don't have any bookings yet. Start planning your next trip!
          </p>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => {
            const tour = tours.find((t) => t.title === booking.tourName);
            const thumbUrl =
              tour?.image || tour?.photo || "/default-tour.jpg";

            return (
              <div key={booking._id} className="booking-card">
                <div className="booking-image">
                  <img
                    src={thumbUrl}
                    alt={booking.tourName}
                  />
                </div>
                <div className="booking-details">
                  <h4>{booking.tourName}</h4>
                  <p>
                    <i className="ri-calendar-line" />{" "}
                    {new Date(booking.bookAt).toDateString()}
                  </p>
                  <p>
                    <i className="ri-time-line" /> 15:00
                  </p>
                  <p>
                    <strong>
                      $
                      {(
                        booking.guestSize *
                        (tour?.price || 95)
                      ).toFixed(2)}
                    </strong>
                  </p>
                  <p>
                    Status: <span className="pending">Pending</span>
                  </p>
                </div>
                <Button
                  color="danger"
                  onClick={() => onCancelClick(booking._id)}
                >
                  Cancel
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Overlay */}
      {pendingCancelId && (
        <div className="confirm-modal">
          <div className="confirm-box">
            <button
              className="close-btn"
              onClick={cancelOverlay}
            >
              ×
            </button>
            <h4>
              Are you sure you want to cancel this booking?
            </h4>
            <div className="confirm-actions">
              {/* Yes = plain secondary */}
              <Button
                className="btn secondary__btn"
                onClick={confirmCancel}
              >
                Yes
              </Button>
              {/* No = orange primary */}
              <Button
                className="btn primary__btn"
                onClick={cancelOverlay}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
      />
    </div>
  );
};

export default MyBookings;
