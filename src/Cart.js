import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Check if user is logged in by checking if username exists in localStorage
  const isLoggedIn = !!localStorage.getItem("un");

  return (
    <>
      <NavBar />
      <div className="cart-container">
        <div className="cart-left">
          <h1>Items in your Cart</h1>
          
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-details">
                  <img src={item.imageUrl} alt={item.name} className="item-image" />
                  <div>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <p>
                      Price: ₹{item.price.toFixed(2)} (MRP: ₹{item.originalPrice}) 
                      <span className="discount">10% Off</span>
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Delivery within <strong>2 Hrs</strong></p>
                    <div className="item-actions">
                      <button onClick={() => removeFromCart(item._id)}>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          {cart.length > 0 && (
            <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
          )}
        </div>

        <div className="cart-right">
          <h2>Payment Details</h2>
          <div className="payment-summary">
            <p>Subtotal: ₹{totalAmount.toFixed(2)}</p>
            <p>Coupon Discount: ₹0.0</p>
            <p className="order-total">Order Total: ₹{totalAmount.toFixed(2)}</p>
            <button 
              className="login-btn"
              onClick={() => isLoggedIn ? navigate('/checkout') : navigate('/')}
            >
              {isLoggedIn ? 'Proceed to Payment' : 'Login to Proceed'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
