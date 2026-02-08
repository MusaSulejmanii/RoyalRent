import React from "react";
import "../styles/Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const goToCategory = (category) => {
    navigate("/vehicles", { state: { bookingData: { carType: category } } });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-column footer-about">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <img src="/assets/logo.png" alt="" width={40} />
              </div>
              <span className="footer-logo-text">Car Rental</span>
            </div>
            <p className="footer-description">
              RoyalRent is your premier choice for automotive freedom. We
              combine a diverse fleet with exceptional customer service to
              ensure that your time on the road is as smooth as possible.
            </p>
            <div className="social-links">
              <a
                href="https://www.facebook.com/"
                className="social-link"
                aria-label="Facebook"
                target="blank"
              >
                <img src="/assets/facebook.png" alt="Facebook" />
              </a>
              <a
                href="https://www.instagram.com/"
                className="social-link"
                aria-label="Instagram"
                target="blank"
              >
                <img src="/assets/instagram.png" alt="Instagram" />
              </a>
              <a
                href="https://x.com/"
                className="social-link"
                aria-label="X"
                target="blank"
              >
                <img src="/assets/twitter.png" alt="Twitter" />
              </a>
              <a
                href="https://www.youtube.com/"
                className="social-link"
                aria-label="YouTube"
                target="blank"
              >
                <img src="/assets/youtube.png" alt="Youtube" />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <div className="footer-contact-item">
              <div className="contact-icon address-icon">
                <img src="/assets/orange-location.png" alt="Location Icon" />
              </div>
              <div className="contact-info">
                <span className="contact-label">Address</span>
                <span className="contact-value">Skopje, Center</span>
              </div>
            </div>
          </div>

          <div className="footer-column">
            <div className="footer-contact-item">
              <div className="contact-icon email-icon">
                <img src="/assets/orange-email.png" alt="Email Icon" />
              </div>
              <div className="contact-info">
                <span className="contact-label">Email</span>
                <span className="contact-value">royalrent@car.com</span>
              </div>
            </div>
          </div>

          <div className="footer-column">
            <div className="footer-contact-item">
              <div className="contact-icon phone-icon">
                <img src="/assets/orange-phone.png" alt="Phone Icon" />
              </div>
              <div className="contact-info">
                <span className="contact-label">Phone</span>
                <span className="contact-value">+389 71 311 030</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-middle">
          <div className="footer-links-column">
            <h3 className="footer-title">Useful links</h3>
            <ul className="footer-links">
              <li>
                <a href="/aboutus">About us</a>
              </li>
              <li>
                <a href="/vehicles">Gallery</a>
              </li>
              <li>
                <a href="/news">News</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h3 className="footer-title">Vehicles</h3>
            <ul className="footer-links">
              <li>
                <a
                  onClick={() => goToCategory("Sedan")}
                  style={{ cursor: "pointer" }}
                >
                  Sedan
                </a>
              </li>
              <li>
                <a
                  onClick={() => goToCategory("Convertible")}
                  style={{ cursor: "pointer" }}
                >
                  Convertible
                </a>
              </li>
              <li>
                <a
                  onClick={() => goToCategory("Coupe")}
                  style={{ cursor: "pointer" }}
                >
                  Coupe
                </a>
              </li>
              <li>
                <a
                  onClick={() => goToCategory("SUV")}
                  style={{ cursor: "pointer" }}
                >
                  SUV
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h3 className="footer-title">Download App</h3>
            <div className="storebuttons">
              <a
                href="https://www.apple.com/app-store/"
                className="store-button"
                target="blank"
              >
                <img src="/assets/appstore.png" alt="Download on App Store" />
              </a>
              <a
                href="https://play.google.com/store/games?device=windows"
                className="store-button"
                target="blank"
              >
                <img src="/assets/playstore.png" alt="Get it on Google Play" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">
            © Copyright RoyalRent. 2026. Design by Musa Sulejmani
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
