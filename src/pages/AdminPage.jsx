import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Image,
  Card,
  Row,
  Col,
  Statistic,
  Tag,
  Space,
  Divider,
} from "antd";
import {
  CarOutlined,
  DollarOutlined,
  PieChartOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Header from "../components/Header";

const API_URL = "https://69845033885008c00db0b870.mockapi.io/api/cars/cars";
const ADMIN_PASSWORD = "admin";

const COLORS = {
  primary: "#e68600",
  secondary: "#ff9500",
  accent: "#6b46c1",
  gradient: "linear-gradient(135deg, #e68600 0%, #ff9500 50%, #6b46c1 100%)",
};

const PageTitle = ({ children }) => (
  <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
    {children}
  </h1>
);

const AdminWrapper = () => {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthorized(true);
    } else {
      message.error("Wrong password!");
    }
  };

  if (!authorized) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: COLORS.gradient,
        }}
      >
        <Card
          style={{
            width: 400,
            borderRadius: 16,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 48,
                marginBottom: 20,
                background: COLORS.gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              🚗
            </div>
            <h2
              style={{
                background: COLORS.gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: 28,
                fontWeight: "bold",
                marginBottom: 30,
              }}
            >
              Admin Login
            </h2>
            <Input.Password
              size="large"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onPressEnter={handleLogin}
              placeholder="Enter admin password"
              style={{ marginBottom: 20 }}
            />
            <Button
              type="primary"
              size="large"
              onClick={handleLogin}
              block
              style={{
                background: COLORS.gradient,
                border: "none",
                height: 45,
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Header />
      <AdminPage />
    </>
  );
};

const AdminPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [form] = Form.useForm();
  const [previewImages, setPreviewImages] = useState([]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setCars(data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const stats = {
    totalCars: cars.length,
    avgPrice:
      cars.length > 0
        ? (
            cars.reduce((sum, car) => sum + Number(car.price || 0), 0) /
            cars.length
          ).toFixed(2)
        : 0,
    categories: [...new Set(cars.map((car) => car.category))].length,
    totalRevenue: cars.reduce((sum, car) => sum + Number(car.price || 0), 0),
  };

  const openModal = (car = null) => {
    setEditingCar(car);
    form.resetFields();
    setPreviewImages([]);
    if (car) {
      form.setFieldsValue({
        ...car,
        images: car.images?.join(", ") || "",
      });
      setPreviewImages(car.images || []);
    }
    setIsModalVisible(true);
  };

  const handleFormChange = (changedValues) => {
    if (changedValues.images !== undefined) {
      const urls = changedValues.images.split(",").map((i) => i.trim());
      setPreviewImages(urls);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const carData = {
        ...values,
        images: values.images
          ? values.images.split(",").map((i) => i.trim())
          : [],
      };

      let res;
      if (editingCar) {
        res = await fetch(`${API_URL}/${editingCar.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(carData),
        });
        message.success("Car updated successfully!");
      } else {
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(carData),
        });
        message.success("Car added successfully!");
      }

      await res.json();
      setIsModalVisible(false);
      await fetchCars();
    } catch (err) {
      console.error(err);
      message.error("Action failed. Make sure all required fields are filled.");
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this car?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
          await res.json();
          message.success("Car deleted successfully!");
          await fetchCars();
        } catch (err) {
          console.error(err);
          message.error("Delete failed");
        }
      },
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <strong style={{ color: COLORS.accent }}>{text}</strong>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <Tag color={COLORS.primary} style={{ borderRadius: 12 }}>
          {category}
        </Tag>
      ),
    },
    {
      title: "Price / Day",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span
          style={{ color: COLORS.secondary, fontWeight: "bold", fontSize: 22 }}
        >
          ${price}
        </span>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Seats",
      dataIndex: "seats",
      key: "seats",
      render: (seats) => seats || "N/A",
    },
    {
      title: "Transmission",
      dataIndex: "transmission",
      key: "transmission",
      render: (transmission) => transmission || "N/A",
    },
    {
      title: "Images",
      key: "images",
      render: (_, record) => (
        <Space>
          {record.images?.slice(0, 3).map((url, i) => (
            <Image
              key={i}
              src={url}
              alt=""
              width={50}
              height={50}
              style={{ borderRadius: 8, objectFit: "cover" }}
            />
          ))}
          {record.images?.length > 3 && (
            <Tag color={COLORS.accent}>+{record.images.length - 3}</Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => openModal(record)}
            style={{
              background: COLORS.primary,
              borderColor: COLORS.primary,
            }}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 30, background: "#f5f5f5", minHeight: "100vh" }}>
      <PageTitle>Admin Dashboard</PageTitle>
      <p>Manage your car rental inventory</p>

      <Row gutter={16} style={{ marginBottom: 30 }}>
        <Col>
          <Card>
            <Statistic
              title="Total Cars"
              value={stats.totalCars}
              prefix={<CarOutlined />}
            />
          </Card>
        </Col>
        <Col>
          <Card>
            <Statistic
              title="Average Price"
              value={stats.avgPrice}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        <Col>
          <Card>
            <Statistic
              title="Categories"
              value={stats.categories}
              prefix={<PieChartOutlined />}
            />
          </Card>
        </Col>
        <Col>
          <Card>
            <Statistic
              title="Total Revenue"
              value={stats.totalRevenue}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={() => openModal()}
        style={{
          marginBottom: 20,
          background: COLORS.gradient,
          border: "none",
          height: 50,
          fontWeight: "bold",
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        Add New Car
      </Button>

      <Card
        style={{ borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
      >
        <Table
          dataSource={cars}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} cars`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      <Modal
        title={
          <span style={{ fontSize: 20, fontWeight: "bold" }}>
            {editingCar ? "Edit Car" : "Add New Car"}
          </span>
        }
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editingCar ? "Update Car" : "Add Car"}
        width={600}
        okButtonProps={{
          style: {
            background: COLORS.gradient,
            border: "none",
            fontWeight: "bold",
          },
        }}
      >
        <Divider />
        <Form form={form} layout="vertical" onValuesChange={handleFormChange}>
          <Form.Item
            name="name"
            label="Car Name"
            rules={[{ required: true, message: "Please enter car name" }]}
          >
            <Input size="large" placeholder="e.g., Tesla Model 3" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please enter category" }]}
          >
            <Input size="large" placeholder="e.g., Electric, SUV, Sedan" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price per Day ($)"
                rules={[{ required: true, message: "Please enter price" }]}
              >
                <InputNumber
                  size="large"
                  style={{ width: "100%" }}
                  min={0}
                  placeholder="50"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="seats" label="Number of Seats">
                <InputNumber
                  size="large"
                  style={{ width: "100%" }}
                  min={1}
                  max={20}
                  placeholder="5"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="transmission" label="Transmission">
                <Input size="large" placeholder="Automatic / Manual" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="airConditioning" label="Air Conditioning">
                <Input size="large" placeholder="Yes / No" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="images" label="Image URLs (comma separated)">
            <Input.TextArea
              rows={3}
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            />
          </Form.Item>

          {previewImages.length > 0 && (
            <div
              style={{
                marginTop: 10,
                padding: 15,
                background: "#f9f9f9",
                borderRadius: 8,
              }}
            >
              <strong style={{ color: COLORS.accent }}>Image Preview:</strong>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginTop: 10,
                  gap: 10,
                }}
              >
                {previewImages.map((url, i) => (
                  <Image
                    key={i}
                    src={url}
                    width={100}
                    height={100}
                    style={{ borderRadius: 8, objectFit: "cover" }}
                  />
                ))}
              </div>
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default AdminWrapper;
