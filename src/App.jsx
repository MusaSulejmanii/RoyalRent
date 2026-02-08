import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import CarDetail from "./pages/CarDetail";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import News from "./pages/News";
import AdminPage from "./pages/AdminPage";
import CheckoutPage from "./pages/CheckoutPage";
import BookingSuccess from "./pages/BookingSuccess";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/news" element={<News />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/checkout/:carId" element={<CheckoutPage />} />
        <Route path="/vehicles/:id" element={<CarDetail />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
