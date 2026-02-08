import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  DatePicker,
  Button,
  Form,
  Input,
  Select,
  Divider,
  Radio,
  message,
  Space,
  Statistic,
  Tag,
} from "antd";
import {
  CreditCardOutlined,
  CalendarOutlined,
  CarOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Header from "../components/Header";

const { RangePicker } = DatePicker;
const { Option } = Select;
const COLORS = {
  primary: "#e68600",
  secondary: "#ff9500",
  accent: "#6b46c1",
  gradient: "linear-gradient(135deg, #e68600 0%, #ff9500 50%, #6b46c1 100%)",
};

const API_URL = "https://69845033885008c00db0b870.mockapi.io/api/cars/cars";

const CheckoutPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [extras, setExtras] = useState([]);

  const extraOptions = [
    { id: "insurance", label: "Full Insurance", price: 15 },
    { id: "gps", label: "GPS Navigation", price: 8 },
    { id: "childSeat", label: "Child Seat", price: 10 },
    { id: "wifi", label: "Portable WiFi", price: 12 },
  ];

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/${carId}`);
        const data = await res.json();
        setCar(data);
      } catch (err) {
        console.error(err);
        message.error("Failed to load car details");
      } finally {
        setLoading(false);
      }
    };

    if (carId) {
      fetchCar();
    }
  }, [carId]);

  const handleDateChange = (dates) => {
    setDateRange(dates);
    if (dates && dates[0] && dates[1]) {
      const days = dates[1].diff(dates[0], "days");
      setNumberOfDays(days);
    } else {
      setNumberOfDays(0);
    }
  };

  const calculateTotals = () => {
    if (!car) return { subtotal: 0, extrasTotal: 0, total: 0 };

    const carPrice = car.price || 0;
    const subtotal = carPrice * numberOfDays;
    const extrasTotal = extras.reduce((sum, extraId) => {
      const extra = extraOptions.find((e) => e.id === extraId);
      return sum + (extra ? extra.price * numberOfDays : 0);
    }, 0);
    const total = subtotal + extrasTotal;

    return { subtotal, extrasTotal, total };
  };

  const { subtotal, extrasTotal, total } = calculateTotals();

  const handleCheckout = async (values) => {
    if (!dateRange || numberOfDays === 0) {
      message.error("Please select pickup and return dates");
      return;
    }

    const bookingData = {
      carId: car.id,
      carName: car.name,
      customerName: values.fullName,
      customerEmail: values.email,
      customerPhone: values.phone,
      pickupDate: dateRange[0].format("YYYY-MM-DD"),
      returnDate: dateRange[1].format("YYYY-MM-DD"),
      numberOfDays,
      paymentMethod,
      cardNumber: values.cardNumber,
      extras,
      subtotal,
      extrasTotal,
      total,
      createdAt: new Date().toISOString(),
    };

    console.log("Booking Data:", bookingData);

    try {
      message.loading({
        content: "Processing your booking...",
        key: "booking",
        duration: 2,
      });

      setTimeout(() => {
        message.success({
          content: "Booking confirmed! 🎉",
          key: "booking",
          duration: 1,
        });

        navigate("/booking-success");
      }, 2000);
    } catch (err) {
      console.error(err);
      message.error("Booking failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ padding: 50, textAlign: "center" }}>Loading...</div>
      </>
    );
  }

  if (!car) {
    return (
      <>
        <Header />
        <div style={{ padding: 50, textAlign: "center" }}>Car not found</div>
      </>
    );
  }

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  return (
    <>
      <Header />
      <div
        style={{
          background: "#f5f5f5",
          minHeight: "100vh",
          padding: "30px 20px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 30 }}>
            <h1
              style={{
                fontSize: 36,
                fontWeight: "bold",
                color: "black",
              }}
            >
              Complete Your Booking
            </h1>

            <p style={{ color: "#666", fontSize: 16 }}>
              Just a few more steps to get on the road!
            </p>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Card
                style={{ marginBottom: 20, borderRadius: 16 }}
                title={
                  <Space>
                    <CalendarOutlined style={{ color: COLORS.primary }} />
                    <span style={{ fontSize: 18, fontWeight: "bold" }}>
                      Rental Period
                    </span>
                  </Space>
                }
              >
                <Form.Item label="Select Pickup & Return Dates">
                  <RangePicker
                    size="large"
                    style={{ width: "100%" }}
                    onChange={handleDateChange}
                    disabledDate={disabledDate}
                    format="MMM DD, YYYY"
                  />
                </Form.Item>
                {numberOfDays > 0 && (
                  <Tag
                    color={COLORS.primary}
                    style={{ fontSize: 14, padding: "5px 15px" }}
                  >
                    {numberOfDays} {numberOfDays === 1 ? "Day" : "Days"} Rental
                  </Tag>
                )}
              </Card>
              <Card
                style={{ marginBottom: 20, borderRadius: 16 }}
                title={
                  <Space>
                    <SafetyOutlined style={{ color: COLORS.secondary }} />
                    <span style={{ fontSize: 18, fontWeight: "bold" }}>
                      Add Extra Options
                    </span>
                  </Space>
                }
              >
                <div>
                  {extraOptions.map((extra) => (
                    <div
                      key={extra.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "15px",
                        marginBottom: 10,
                        background: extras.includes(extra.id)
                          ? "#fff7e6"
                          : "#fafafa",
                        borderRadius: 8,
                        border: `2px solid ${
                          extras.includes(extra.id) ? COLORS.primary : "#e0e0e0"
                        }`,
                        cursor: "pointer",
                        transition: "all 0.3s",
                      }}
                      onClick={() => {
                        if (extras.includes(extra.id)) {
                          setExtras(extras.filter((e) => e !== extra.id));
                        } else {
                          setExtras([...extras, extra.id]);
                        }
                      }}
                    >
                      <Space>
                        {extras.includes(extra.id) ? (
                          <CheckCircleOutlined
                            style={{ color: COLORS.primary, fontSize: 20 }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              border: "2px solid #ccc",
                              borderRadius: "50%",
                            }}
                          />
                        )}
                        <span style={{ fontWeight: "500" }}>{extra.label}</span>
                      </Space>
                      <span
                        style={{ color: COLORS.accent, fontWeight: "bold" }}
                      >
                        ${extra.price}/day
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card
                style={{ marginBottom: 20, borderRadius: 16 }}
                title={
                  <Space>
                    <UserOutlined style={{ color: COLORS.accent }} />
                    <span style={{ fontSize: 18, fontWeight: "bold" }}>
                      Your Details
                    </span>
                  </Space>
                }
              >
                <Form form={form} layout="vertical" onFinish={handleCheckout}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[
                          { required: true, message: "Please enter your name" },
                        ]}
                      >
                        <Input
                          size="large"
                          prefix={<UserOutlined />}
                          placeholder="John Doe"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your email",
                          },
                          {
                            type: "email",
                            message: "Please enter a valid email",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          prefix={<MailOutlined />}
                          placeholder="john@example.com"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                      { required: true, message: "Please enter your phone" },
                    ]}
                  >
                    <Input
                      size="large"
                      prefix={<PhoneOutlined />}
                      placeholder="+389 71 311 030"
                    />
                  </Form.Item>

                  <Divider />
                  <h3 style={{ marginBottom: 20 }}>
                    <CreditCardOutlined
                      style={{ marginRight: 8, color: COLORS.primary }}
                    />
                    Payment Method
                  </h3>
                  <Form.Item>
                    <Radio.Group
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ width: "100%" }}
                    >
                      <Space direction="vertical" style={{ width: "100%" }}>
                        <Radio value="visa" style={{ width: "100%" }}>
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              padding: "10px",
                            }}
                          >
                            <img
                              src="/assets/visa-icon.png"
                              alt="Visa"
                              style={{
                                width: 50,
                                height: 40,
                                objectFit: "contain",
                                marginRight: 10,
                              }}
                            />
                            <span style={{ fontWeight: "500" }}>
                              Visa / Mastercard
                            </span>
                          </div>
                        </Radio>

                        <Radio value="paypal" style={{ width: "100%" }}>
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              padding: "10px",
                            }}
                          >
                            <img
                              src="/assets/paypal-icon.png"
                              alt="PayPal"
                              style={{
                                width: 50,
                                height: 30,
                                objectFit: "contain",
                                marginRight: 10,
                              }}
                            />
                            <span style={{ fontWeight: "500" }}>PayPal</span>
                          </div>
                        </Radio>

                        <Radio value="applepay" style={{ width: "100%" }}>
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              padding: "10px",
                            }}
                          >
                            <img
                              src="/assets/apple-pay-icon.png"
                              alt="Apple Pay"
                              style={{
                                width: 50,
                                height: 40,
                                objectFit: "contain",
                                marginRight: 10,
                              }}
                            />
                            <span style={{ fontWeight: "500" }}>Apple Pay</span>
                          </div>
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>

                  {paymentMethod === "visa" && (
                    <>
                      <Row gutter={16}>
                        <Col span={24}>
                          <Form.Item
                            name="cardNumber"
                            label="Card Number"
                            rules={[
                              {
                                required: true,
                                message: "Please enter card number",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              prefix={<CreditCardOutlined />}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name="expiryDate"
                            label="Expiry Date"
                            rules={[{ required: true, message: "Required" }]}
                          >
                            <Input
                              size="large"
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="cvv"
                            label="CVV"
                            rules={[{ required: true, message: "Required" }]}
                          >
                            <Input
                              size="large"
                              placeholder="123"
                              maxLength={4}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </>
                  )}

                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    block
                    style={{
                      marginTop: 20,
                      height: 50,
                      backgroundColor: "#6b46c1",
                      border: "none",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Complete Booking - ${total.toFixed(2)}
                  </Button>
                </Form>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <div style={{ position: "sticky", top: 20 }}>
                <Card
                  style={{
                    borderRadius: 16,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  title={
                    <Space>
                      <CarOutlined style={{ color: COLORS.primary }} />
                      <span style={{ fontSize: 18, fontWeight: "bold" }}>
                        Booking Summary
                      </span>
                    </Space>
                  }
                >
                  {car.images && car.images[0] && (
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      style={{
                        width: "100%",
                        borderRadius: 12,
                        marginBottom: 20,
                      }}
                    />
                  )}

                  <h2 style={{ marginBottom: 10, color: COLORS.accent }}>
                    {car.name}
                  </h2>
                  <div style={{ marginBottom: 20 }}>
                    <Tag color={COLORS.primary}>{car.category}</Tag>
                    <Tag>{car.transmission}</Tag>
                    <Tag>{car.seats} Seats</Tag>
                  </div>

                  <Divider />

                  <div style={{ marginBottom: 15 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 10,
                      }}
                    >
                      <span style={{ color: "#666" }}>
                        ${car.price}/day × {numberOfDays || 0} days
                      </span>
                      <span style={{ fontWeight: "bold" }}>
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    {extras.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 10,
                        }}
                      >
                        <span style={{ color: "#666" }}>Extra Options</span>
                        <span style={{ fontWeight: "bold" }}>
                          ${extrasTotal.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  <Divider />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 18, fontWeight: "bold" }}>
                      Total
                    </span>
                    <span
                      style={{
                        fontSize: 26,
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  {numberOfDays === 0 && (
                    <div
                      style={{
                        marginTop: 20,
                        padding: 15,
                        background: "#fff7e6",
                        borderRadius: 8,
                        textAlign: "center",
                        color: COLORS.primary,
                      }}
                    >
                      Select dates to see the total price
                    </div>
                  )}
                </Card>

                <Card
                  style={{
                    marginTop: 20,
                    borderRadius: 16,
                    background: "#f9f9f9",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <CheckCircleOutlined
                      style={{
                        fontSize: 32,
                        color: "#52c41a",
                        marginBottom: 10,
                      }}
                    />
                    <div style={{ fontWeight: "bold", marginBottom: 5 }}>
                      Secure Payment
                    </div>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      Your payment information is encrypted and secure
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
