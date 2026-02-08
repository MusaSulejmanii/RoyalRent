import React from "react";
import { Button, Result, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col>
        <Result
          status="404"
          title="404 - Page Not Found"
          subTitle="The page you are looking for does not exist."
          extra={[
            <Button
              key="back"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>,
            <Button key="home" type="primary" onClick={() => navigate("/")}>
              Go Home
            </Button>,
          ]}
        />
      </Col>
    </Row>
  );
};

export default NotFound;
