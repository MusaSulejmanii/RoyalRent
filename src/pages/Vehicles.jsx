import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cars from "../components/Cars";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Skeleton, Breadcrumb, Row, Col } from "antd";
import "antd/dist/reset.css";
import "../styles/CarSection.css";

const Vehicles = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const bookingData = location.state?.bookingData;

  const toSentenceCase = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://69845033885008c00db0b870.mockapi.io/api/cars/cars",
      );
      if (!res.ok) throw new Error("Failed to fetch cars");
      const data = await res.json();
      setCars(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredCars = useMemo(() => {
    if (bookingData?.carType) {
      return cars.filter(
        (car) =>
          car.category?.toLowerCase() === bookingData.carType.toLowerCase(),
      );
    }
    return cars;
  }, [cars, bookingData]);

  const handleViewDetails = (carId) => {
    navigate(`/vehicles/${carId}`, { state: { bookingData } });
  };

  return (
    <>
      <Header />

      <Row justify="center" gutter={[0, 30]} style={{ paddingTop: 30 }}>
        <Col xs={22} sm={20} md={18} lg={16} xl={14}>
          <Breadcrumb
            items={[
              { title: <a onClick={() => navigate("/")}>Home</a> },
              { title: "Vehicles" },
            ]}
          />

          <div
            className="cars-header"
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h2 className="section-title">Choose the car that suits you</h2>
            <span>
              Find the right car exactly when you need it. Our fleet is
              available for instant booking 24/7 across multiple city hubs.
            </span>
          </div>

          {bookingData && (
            <div className="booking-summary" style={{ marginTop: 30 }}>
              <h3>Your booking details</h3>

              {bookingData.carType && (
                <div className="booking-summary-row">
                  <span className="booking-summary-label">Car type</span>
                  <span className="booking-summary-value highlight">
                    {bookingData.carType.toUpperCase()}
                  </span>
                </div>
              )}

              {bookingData.placeOfRental && (
                <div className="booking-summary-row">
                  <span className="booking-summary-label">Pickup</span>
                  <span className="booking-summary-value">
                    {toSentenceCase(bookingData.placeOfRental)}
                  </span>
                </div>
              )}

              {bookingData.placeOfReturn && (
                <div className="booking-summary-row">
                  <span className="booking-summary-label">Return</span>
                  <span className="booking-summary-value">
                    {toSentenceCase(bookingData.placeOfReturn)}
                  </span>
                </div>
              )}

              {bookingData.rentalDateTime && (
                <div className="booking-summary-row">
                  <span className="booking-summary-label">From</span>
                  <span className="booking-summary-value booking-summary-date">
                    {new Date(bookingData.rentalDateTime).toLocaleString()}
                  </span>
                </div>
              )}

              {bookingData.returnDateTime && (
                <div className="booking-summary-row">
                  <span className="booking-summary-label">To</span>
                  <span className="booking-summary-value booking-summary-date">
                    {new Date(bookingData.returnDateTime).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          )}
        </Col>
      </Row>

      {error && (
        <p style={{ color: "red", textAlign: "center", padding: "20px" }}>
          Error: {error}
        </p>
      )}

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <Skeleton active paragraph={{ rows: 5 }} />
        </div>
      ) : (
        <Cars cars={filteredCars} onViewDetails={handleViewDetails} />
      )}

      <Row justify="center" align="middle" style={{ marginTop: 30 }}>
        <Col>
          <img src="/assets/Logos.png" alt="Logos" className="logos-img" />
        </Col>
      </Row>

      <Footer />
    </>
  );
};

export default Vehicles;
