import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CTA.css";

const CTA = () => {
  const [city, setCity] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const navigate = useNavigate();

  const cities = [
    "Shkup",
    "Tetovë",
    "Prishtinë",
    "Prizren",
    "Kumanovë",
    "Tiranë",
    "Durrës",
    "Vlorë",
    "Ohrid",
    "Shkodër",
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.length > 0) {
      const filtered = cities.filter((cityName) =>
        cityName.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setFilteredCities([]);
    }
  };

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    setShowSuggestions(false);
    setFilteredCities([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      navigate("/vehicles", {
        state: { bookingData: { placeOfRental: city } },
      });
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Hit the Open Road?</h2>
          <p className="cta-description">
            Stop dreaming and start driving. Enter your city below to see our
            available fleet in real-time.
          </p>

          <form className="cta-form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onFocus={() => city && setShowSuggestions(true)}
                className="cta-input"
                autoComplete="off"
              />

              {showSuggestions && filteredCities.length > 0 && (
                <div className="suggestions-dropdown">
                  {filteredCities.slice(0, 3).map((cityName, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onMouseDown={() => handleCitySelect(cityName)}
                    >
                      {cityName}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button type="submit" className="cta-button">
              Search Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTA;
