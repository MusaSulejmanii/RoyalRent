import React from "react";
import "../styles/CarSection.css";

const CarsSection = () => {
  return (
    <section className="cars-section">
      <div className="cars-container">
        <div className="section-top">
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-number">1</span>
              <div className="feature-content">
                <h3 className="feature-title">Choose Your Vehicle</h3>
                <p className="feature-description">
                  Browse our wide selection of cars, from compact city models to
                  spacious SUVs, and select the one that fits your needs.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-number">2</span>
              <div className="feature-content">
                <h3 className="feature-title">Pick Your Dates</h3>
                <p className="feature-description">
                  Select your pickup and return dates along with your preferred
                  location. Our flexible booking system makes it seamless.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-number">3</span>
              <div className="feature-content">
                <h3 className="feature-title">Confirm & Book</h3>
                <p className="feature-description">
                  Review your details, add any extras like GPS or child seats,
                  and confirm your booking with a secure payment.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <span className="feature-number">4</span>
              <div className="feature-content">
                <h3 className="feature-title">Drive Away</h3>
                <p className="feature-description">
                  Pick up your keys from our friendly staff and hit the road! We
                  ensure a quick checkout process so you can start your journey.
                </p>
              </div>
            </div>
          </div>

          <div className="image-placeholder">
            <img
              src="./assets/section1-png.png"
              alt="Section Illustration"
              height={200}
              width={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarsSection;
