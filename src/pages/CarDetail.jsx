import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById, getCars } from "../api/cars";
import { Skeleton } from "antd";
import "antd/dist/reset.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Breadcrumb } from "antd";
import Cars from "../components/Cars";
import "../styles/CarDetail.css";

export default function CarDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [relatedCars, setRelatedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchCarAndRelated = async () => {
      try {
        setLoading(true);
        const carData = await getCarById(id);
        setCar(carData);

        const allCars = await getCars();
        const filtered = allCars.filter((c) => c.id !== id);
        setRelatedCars(filtered);
      } catch (err) {
        console.error(err);
        setError("Failed to load car data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCarAndRelated();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
            padding: "20px",
          }}
        >
          <Skeleton active paragraph={{ rows: 10 }} title={{ width: "60%" }} />
        </div>
        <Footer />
      </>
    );
  }

  if (error || !car) {
    return (
      <>
        <Header />
        <p style={{ textAlign: "center", padding: "20px", color: "red" }}>
          {error || "Car not found"}
        </p>
        <Footer />
      </>
    );
  }

  const carImages = car.images || [];

  return (
    <>
      <Header />

      <div className="container">
        <div style={{ padding: "0px 240px" }}>
          <Breadcrumb
            items={[
              { title: <a onClick={() => navigate("/")}>Home</a> },
              { title: <a onClick={() => navigate("/vehicles")}>Vehicles</a> },
              { title: car.name },
            ]}
          />
        </div>

        <div className="card">
          <div className="left-section">
            <h1 className="brand-title">{car.name || car.brand}</h1>
            <div className="price-tag">
              <span className="price">${car.price}</span>
              <span className="price-period">/ day</span>
            </div>

            {carImages.length > 0 && (
              <img
                src={carImages[selectedImage]}
                alt="Main Car"
                className="main-image"
              />
            )}

            <div className="thumbnail-grid">
              {carImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`thumbnail ${selectedImage === idx ? "active" : ""}`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="right-section">
            <div className="section-title">Technical Specification</div>
            <div className="specs-grid">
              <div className="spec-card">
                <div className="spec-label">Category</div>
                <div className="spec-value">{car.category}</div>
              </div>
              <div className="spec-card">
                <div className="spec-label">Transmission</div>
                <div className="spec-value">{car.transmission}</div>
              </div>
              <div className="spec-card">
                <div className="spec-label">Seats</div>
                <div className="spec-value">{car.seats}</div>
              </div>
              <div className="spec-card">
                <div className="spec-label">Air Conditioning</div>
                <div className="spec-value">{car.airConditioning}</div>
              </div>
              <div className="spec-card">
                <div className="spec-label">Fuel</div>
                <div className="spec-value">{car.fuel}</div>
              </div>
              <div className="spec-card">
                <div className="spec-label">Engine</div>
                <div className="spec-value">{car.engine}</div>
              </div>
            </div>
            <button
              className="view-details-btn"
              style={{ margin: "50px 0" }}
              onClick={() => navigate(`/checkout/${car.id}`)}
            >
              Rent a Car
            </button>

            <div className="section-title">Car Equipment</div>
            <div className="equipment-grid">
              {(car.equipment || []).map((item, idx) => (
                <div key={idx} className="equipment-item">
                  <div className="check-icon">✔</div>
                  <span className="equipment-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {relatedCars.length > 0 && (
          <div
            style={{
              marginTop: 40,
              fontWeight: 700,
              fontSize: 30,
              fontFamily: '"Playfair Display", serif',
            }}
          >
            <h2 style={{ paddingLeft: "240px" }}>Other Cars</h2>

            <Cars
              cars={relatedCars.slice(0, 6)}
              onViewDetails={(carId) => navigate(`/vehicles/${carId}`)}
            />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
