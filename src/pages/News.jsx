import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Breadcrumb, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const News = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <Row justify="center" gutter={[0, 30]} style={{ paddingTop: 30 }}>
        <Col xs={22} sm={20} md={18} lg={16} xl={14}>
          <Breadcrumb
            items={[
              { title: <a onClick={() => navigate("/")}>Home</a> },
              { title: "News" },
            ]}
          />

          <div className="cars-header" style={{ marginTop: 20 }}>
            <h2 className="section-title">Get in Touch</h2>
          </div>

          <p>
            You can reach us at <strong>contact@example.com</strong> or call us
            at <strong>+123 456 7890</strong>.
          </p>
        </Col>
      </Row>

      <Footer />
    </>
  );
};

export default News;
