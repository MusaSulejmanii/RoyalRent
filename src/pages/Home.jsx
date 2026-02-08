import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Header from "../components/Header";
import CarSection from "../components/CarSection";
import FactsSection from "../components/FactsSection";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Mobile from "../components/Mobile";

const toLocalDateTime = (date) => {
  const pad = (n) => String(n).padStart(2, "0");

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes())
  );
};

const Home = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    carType: "",
    placeOfRental: "",
    placeOfReturn: "",
    rentalDateTime: "",
    returnDateTime: "",
  });

  const [errors, setErrors] = useState({});

  const minPickupDateTime = toLocalDateTime(new Date());

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "rentalDateTime") {
        return {
          ...prev,
          rentalDateTime: value,
          returnDateTime: "",
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });

    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.carType) {
      newErrors.carType = "Please select a car type.";
    }

    if (!formData.placeOfRental) {
      newErrors.placeOfRental = "Please select pickup location.";
    }

    if (!formData.placeOfReturn) {
      newErrors.placeOfReturn = "Please select return location.";
    }

    if (!formData.rentalDateTime) {
      newErrors.rentalDateTime = "Please select pickup date & time.";
    }

    if (!formData.returnDateTime) {
      newErrors.returnDateTime = "Please select return date & time.";
    }

    if (formData.rentalDateTime && formData.returnDateTime) {
      const pickup = new Date(formData.rentalDateTime);
      const dropoff = new Date(formData.returnDateTime);
      const diffHours = (dropoff - pickup) / (1000 * 60 * 60);

      if (diffHours < 24) {
        newErrors.returnDateTime =
          "Minimum rental period is 1 full day (24 hours).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    navigate("/vehicles", { state: { bookingData: formData } });
  };

  const minReturnDateTime = formData.rentalDateTime
    ? toLocalDateTime(
        new Date(
          new Date(formData.rentalDateTime).getTime() + 24 * 60 * 60 * 1000,
        ),
      )
    : minPickupDateTime;

  return (
    <div className="booking-section">
      <Header />

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Premium Rentals for Every Journey.</h1>
            <p>
              From luxury sedans to rugged SUVs, find the perfect vehicle for
              your next trip. Transparent pricing, 24/7 support, and easy
              pickup.
            </p>
            <a href="/vehicles" className="view-cars-button">
              View All Cars
            </a>
          </div>

          <div className="booking-form-container">
            <h2>Book your car</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <select
                  name="carType"
                  value={formData.carType}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Car type</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="coupe">Coupe</option>
                  <option value="convertible">Convertible</option>
                </select>
                {errors.carType && (
                  <p className="form-error">{errors.carType}</p>
                )}
              </div>

              <div className="form-group">
                <select
                  name="placeOfRental"
                  value={formData.placeOfRental}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Place of rental</option>
                  <option value="shkup">Shkup</option>
                  <option value="tetove">Tetovë</option>
                  <option value="prishtine">Prishtinë</option>
                  <option value="prizren">Prizren</option>
                  <option value="kumanove">Kumanovë</option>
                  <option value="tirane">Tiranë</option>
                  <option value="durres">Durrës</option>
                  <option value="vlore">Vlorë</option>
                  <option value="ohrid">Ohrid</option>
                  <option value="shkoder">Shkodër</option>
                </select>
                {errors.placeOfRental && (
                  <p className="form-error">{errors.placeOfRental}</p>
                )}
              </div>

              <div className="form-group">
                <select
                  name="placeOfReturn"
                  value={formData.placeOfReturn}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Place of return</option>
                  <option value="shkup">Shkup</option>
                  <option value="tetove">Tetovë</option>
                  <option value="prishtine">Prishtinë</option>
                  <option value="prizren">Prizren</option>
                  <option value="kumanove">Kumanovë</option>
                  <option value="tirane">Tiranë</option>
                  <option value="durres">Durrës</option>
                  <option value="vlore">Vlorë</option>
                  <option value="ohrid">Ohrid</option>
                  <option value="shkoder">Shkodër</option>
                </select>
                {errors.placeOfReturn && (
                  <p className="form-error">{errors.placeOfReturn}</p>
                )}
              </div>

              <div className="form-group">
                <input
                  type="datetime-local"
                  name="rentalDateTime"
                  value={formData.rentalDateTime}
                  onChange={handleChange}
                  min={minPickupDateTime}
                  className="form-input"
                  required
                />
                {errors.rentalDateTime && (
                  <p className="form-error">{errors.rentalDateTime}</p>
                )}
              </div>

              <div className="form-group">
                <input
                  key={minReturnDateTime}
                  type="datetime-local"
                  name="returnDateTime"
                  value={formData.returnDateTime}
                  onChange={handleChange}
                  min={minReturnDateTime}
                  className="form-input"
                  required
                />
                {errors.returnDateTime && (
                  <p className="form-error">{errors.returnDateTime}</p>
                )}
              </div>

              <button type="submit" className="book-now-btn">
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="features-container">
        <div className="feature">
          <div className="feature-icon">
            <img src="./assets/location.png" alt="" />
          </div>
          <h3>Availability</h3>
          <p>
            We offer 24/7 pickup and drop-off services across all major
            locations and airports to fit your schedule.
          </p>
        </div>

        <div className="feature">
          <div className="feature-icon">
            <img src="./assets/car.png" alt="" />
          </div>
          <h3>Comfort</h3>
          <p>
            Drive in style with our fleet of modern, well-maintained vehicles
            equipped with the latest safety and tech features.
          </p>
        </div>

        <div className="feature">
          <div className="feature-icon">
            <img src="./assets/wallet.png" alt="" />
          </div>
          <h3>Savings</h3>
          <p>
            Enjoy premium service at competitive rates with no hidden fees. Best
            price guaranteed for long-term rentals.
          </p>
        </div>
      </div>

      <CarSection />
      <FactsSection />
      <Mobile />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
