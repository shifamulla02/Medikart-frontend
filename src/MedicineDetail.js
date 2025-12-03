import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import NavBar from './NavBar';  // Import Navbar component
import './MedicineDetail.css';

function MedicineDetail() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [isAdded, setIsAdded] = useState(false);  
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/records/${id}`);
        const data = await response.json();
        setMedicine(data);
      } catch (error) {
        console.error("Error fetching medicine details:", error);
      }
    };

    fetchMedicine();
  }, [id]);

  const handleAddToCart = () => {
    if (medicine) {
      const itemToAdd = {
        ...medicine,
        price: medicine.mrp - (medicine.mrp * 0.10),
        originalPrice: medicine.mrp,
        quantity: 1
      };
      addToCart(itemToAdd);
      setIsAdded(true);  
    }
  };

  if (!medicine) return <div>Loading...</div>;

  return (
    <>
      <NavBar />  {/* Render Navbar at the top */}
      <div className="medicine-detail">
        <h1>{medicine.name}</h1>
        <div className="medicine-info">
          <div className="medicine-image">
            <img 
  src={
    medicine.imageUrl.startsWith('http') 
      ? medicine.imageUrl 
      : `http://localhost:9000${medicine.imageUrl}`
  } 
  alt={medicine.name} 
/>


          </div>
          <div className="medicine-description">
            <p><strong>Category:</strong> {medicine.category}</p>
            <p><strong>MRP:</strong> ₹{medicine.mrp}</p>
            <p><strong>Manufactured By:</strong> {medicine.mfg}</p>
            <p><strong>Expiration Date:</strong> {medicine.exp}</p>
            <p><strong>Description:</strong> {medicine.description}</p>
            {!isAdded ? (
              <button onClick={handleAddToCart}>Add to Cart</button>
            ) : (
              <div className="added-to-cart">
                ✅ Added to Cart!
                <div style={{ marginTop: '10px' }}>
                  <button onClick={() => navigate('/cart')} style={{ marginRight: '10px' }}>
                    Go to Cart
                  </button>
                  <button onClick={() => { 
                    setIsAdded(false); 
                    navigate('/home'); 
                  }}>
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MedicineDetail;
