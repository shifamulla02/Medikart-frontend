import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import AboutUs from "./AboutUs";
import Create from "./Create";
import MedicineDetail from "./MedicineDetail";
import AdminDashboard from "./AdminDashboard";
import DeleteMedicine from "./DeleteMedicine";
import ViewMedicine from "./ViewMedicine";
import Cart from "./Cart";
import Checkout from "./Checkout";  // Import the Checkout component
import { CartProvider } from "./CartContext";
import { AuthProvider } from "./AuthContext";  // Import AuthProvider

function App() {
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/records");
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };

  const handleDeleteMedicine = async (medicineName) => {
    try {
      const res = await axios.delete(`http://localhost:9000/api/records/${medicineName}`);
      console.log("Delete response:", res.data);
      await fetchRecords();
    } catch (err) {
      console.error("Error deleting medicine:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>  
        <CartProvider>  
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home records={records} />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/delete-medicine" element={<DeleteMedicine onDelete={handleDeleteMedicine} />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/create" element={<Create fetchRecords={fetchRecords} />} />
            <Route path="/medicine/:id" element={<MedicineDetail />} />
            <Route path="/view-medicine" element={<ViewMedicine />} />
            <Route path="/cart" element={<Cart />} />
	    <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
