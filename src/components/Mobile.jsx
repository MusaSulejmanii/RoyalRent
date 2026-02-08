import React from "react";
import "../styles/Mobile.css";

const Mobile = () => {
  return (
    <section className="app-download-section">
      <div className="content-side">
        <h1 className="section-title">Your Rental, Always in Your Pocket</h1>

        <p className="paragraph-mobile">
          Experience faster bookings, instant notifications, and paperless
          rentals. With the RoyalRent app, managing your journey is just a tap
          away.
        </p>

        <div className="store-buttons">
          <a
            href="https://www.apple.com/app-store/"
            className="store-button"
            target="blank"
          >
            <img src="./assets/appstore.png" alt="Download on App Store" />
          </a>
          <a
            href="https://play.google.com/store/games?device=windows"
            className="store-button"
            target="blank"
          >
            <img src="./assets/playstore.png" alt="Get it on Google Play" />
          </a>
        </div>
      </div>

      <div className="image-side" style={{ display: "none" }}>
        <img
          src="./assets/phones.png"
          alt="Mobile App Preview"
          className="app-image"
        />
      </div>
    </section>
  );
};

export default Mobile;
