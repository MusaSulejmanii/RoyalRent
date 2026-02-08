import React, { useState, useEffect } from "react";
import "../styles/CarSection.css";
import { Skeleton } from "antd";
import "antd/dist/reset.css";

const CarCard = ({ car, onViewDetails }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = car.images || [];

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  const goToImage = (index) => setCurrentImageIndex(index);

  return (
    <div className="car-card">
      <div
        className="car-image-container"
        style={{ cursor: "pointer" }}
        onClick={() => onViewDetails(car.id)}
      >
        {images.length > 0 ? (
          <>
            <div className="car-image-wrapper">
              <img
                src={images[currentImageIndex]}
                alt={`${car.name} - ${currentImageIndex + 1}`}
                className="car-image"
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  className="image-nav-btn prev-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  ‹
                </button>
                <button
                  className="image-nav-btn next-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  ›
                </button>

                <div className="image-dots">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`dot ${index === currentImageIndex ? "active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToImage(index);
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="car-image-placeholder" />
        )}
      </div>
      <div className="car-info">
        <div className="car-header">
          <div>
            <h3 className="car-name">{car.name}</h3>
            <p className="car-category">{car.category}</p>
          </div>
          <div className="car-price">
            <span className="price-amount">${car.price}</span>
            <span className="price-period">Per Day</span>
          </div>
        </div>

        <div className="car-specs">
          <div className="spec-item">
            <span className="spec-icon">
              <img src="/assets/gear-shift.png" alt="Gear Shift" />
            </span>
            <span className="spec-text">{car.transmission}</span>
          </div>
          <div className="spec-item">
            <span className="spec-icon">
              <img src="/assets/seats-icon.png" alt="Seat Icon" />
            </span>
            <span className="spec-text">{car.seats} Seats</span>
          </div>
          <div className="spec-item">
            <span className="spec-icon">
              <img src="/assets/aircon.png" alt="Air Conditioner" />
            </span>
            <span className="spec-text">{car.airConditioning}</span>
          </div>
        </div>

        <button
          className="view-details-btn"
          onClick={() => onViewDetails(car.id)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const CarsSection = ({ cars = [], loading = false, onViewDetails }) => {
  const [filteredCars, setFilteredCars] = useState(cars);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredCars(cars);
    } else {
      setFilteredCars(cars.filter((car) => car.category === category));
    }
  };

  const categories = ["All", ...new Set(cars.map((car) => car.category))];

  if (loading) {
    return (
      <section className="cars-section">
        <div className="cars-container">
          <div className="cars-header">
            <h2 className="section-title">Choose the car that suits you</h2>
          </div>

          <div className="filter-buttons">
            {categories.map((category) => (
              <Skeleton.Button
                key={category}
                active
                style={{ marginRight: 8, width: 80, height: 32 }}
              />
            ))}
          </div>

          <div className="cars-grid">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} active paragraph={{ rows: 6 }} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cars-section">
      <div className="cars-container">
        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => handleFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="cars-grid">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} onViewDetails={onViewDetails} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarsSection;
