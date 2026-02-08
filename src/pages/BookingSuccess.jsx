import React from "react";
import { Result, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const BookingSuccess = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        padding: 20,
      }}
    >
      <Result
        icon={
          <CheckCircleOutlined style={{ color: "#52c41a", fontSize: 80 }} />
        }
        title="Booking Confirmed!"
        subTitle="Your car is booked successfully. Get ready to hit the road!"
        extra={[
          <Button type="primary" key="home" onClick={() => navigate("/")}>
            Return Home
          </Button>,
        ]}
      />
    </div>
  );
};

export default BookingSuccess;
