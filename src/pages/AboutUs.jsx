import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Breadcrumb, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/AboutUs.css";

const AboutUs = () => {
  const navigate = useNavigate();
  const [play, setPlay] = useState(false);

  return (
    <>
      <Header />

      <Row justify="center" style={{ paddingTop: 20 }}>
        <Col xs={22} sm={20} md={18} lg={16} xl={14}>
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { title: <a onClick={() => navigate("/")}>Home</a> },
              { title: "About Us" },
            ]}
          />

          <div className="landing-page">
            <section className="hero-section">
              <h1>Where every drive feels extraordinary</h1>
              <h3>
                At RoyalRent, we believe a journey is more than just getting
                from point A to point B. It’s about the comfort, the style, and
                the confidence that comes with driving a premium vehicle.
                Whether you're here for business or a weekend getaway, we
                provide a fleet designed to elevate your experience.
              </h3>
            </section>

            {/* Video Section */}
            <section className="video-section">
              <div className="video-wrapper">
                {!play ? (
                  <div
                    className="video-placeholder"
                    onClick={() => setPlay(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="play-button">
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 60 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="30" cy="30" r="30" fill="#6b46c1" />
                        <path d="M24 20L40 30L24 40V20Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <iframe
                    width="100%"
                    height="500"
                    src="https://www.youtube.com/embed/abjQAzTkaE8?autoplay=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
              <div className="stats-grid">
                <div className="stat-item">
                  <h2 className="stat-number">1.5K+</h2>
                  <p className="stat-label">Happy Customers</p>
                </div>
                <div className="stat-item">
                  <h2 className="stat-number">20+</h2>
                  <p className="stat-label">Cars</p>
                </div>
                <div className="stat-item">
                  <h2 className="stat-number">10+</h2>
                  <p className="stat-label">Years of Experience</p>
                </div>
                <div className="stat-item">
                  <h2 className="stat-number">15+</h2>
                  <p className="stat-label">Staff Members</p>
                </div>
              </div>
            </section>

            {/* Memories Section */}
            <section className="memories-section">
              <div className="memories-content">
                <div className="memories-text">
                  <h2 className="section-title">
                    Unlock unforgettable memories on the road
                  </h2>
                  <p className="section-description">
                    With millions and counting, we provide flexibility,
                    convenience, and an array of options to choose from for your
                    next road trip or weekend getaway.
                  </p>

                  <div className="benefits-grid">
                    {[
                      "Guaranteed to find the perfect car",
                      "Best price guaranteed",
                      "Seamless booking",
                      "24/7 customer support",
                    ].map((title, i) => (
                      <div key={i} className="benefit-item">
                        <div className="benefit-icon">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="#6b46c1"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path
                              d="M9 12L11 14L15 10"
                              stroke="white"
                              strokeWidth="2"
                              fill="none"
                            />
                          </svg>
                        </div>
                        <div className="benefit-text">
                          <h4>{title}</h4>
                          <p>Some description about {title.toLowerCase()}.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="memories-image">
                  <div className="image-placeholder">
                    <img src="/assets/enjoy.jpg" alt="" />
                  </div>
                </div>
              </div>
            </section>

            {/* App Section */}
            <section className="app-section">
              <div className="app-content">
                <div className="app-phone">
                  <div className="phone-mockup">
                    <img
                      src="/assets/phones.png"
                      alt="Phone Mockup"
                      className="phone-screen"
                    />
                  </div>
                </div>

                <div className="app-info">
                  <div className="app-badge">MOBILE APP</div>
                  <h2 className="app-title">Download our app</h2>
                  <p className="app-description">
                    Book a ride with just a tap on your phone. Our mobile app
                    makes it easier than ever to get where you need to go, with
                    real-time updates and seamless payment options.
                  </p>
                  <div className="app-buttons">
                    <a
                      href="https://www.apple.com/app-store/"
                      className="app-button app-store"
                    >
                      <img
                        src="/assets/appstore-white.png"
                        alt="Download on App Store"
                      />
                    </a>
                    <a
                      href="https://play.google.com/store/games?device=windows"
                      className="app-button play-store"
                    >
                      <img
                        src="/assets/playstore-white.png"
                        alt="Get it on Google Play"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Col>
      </Row>

      <Footer />
    </>
  );
};

export default AboutUs;
