import React, { useState, useContext } from "react";
import NavBar from "./NavBar";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

function Checkout() {
    const nav = useNavigate();
    const { cart } = useContext(CartContext);

    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [address, setAddress] = useState({
        name: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pincode: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:9000/place-order", { phoneNumber: address.phone });

            if (response.data.message.includes("SMS sent")) {
                alert("Order placed successfully! SMS sent.");
                nav("/home");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error sending SMS:", error);
            alert("Failed to send SMS. Please try again.");
        }
    };

    const validateAddress = () => {
        if (!address.name || !address.phone || !address.address1 || !address.city || !address.state || !address.pincode) {
            setError("Please fill all the required fields.");
            return false;
        }
        setError("");
        return true;
    };

    const handleNext = () => {
        if (step === 1 && cart.length === 0) {
            setError("Your cart is empty.");
            return;
        }
        if (step === 2 && !validateAddress()) return;

        setStep(step + 1);
    };

    const handleBack = () => setStep(step - 1);

    const handleStepClick = (clickedStep) => {
        if (clickedStep < step) setStep(clickedStep);
    };

    const subtotal = parseFloat(cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2));
    const tax = parseFloat((subtotal * 0.05).toFixed(2));
    const gst = parseFloat((subtotal * 0.12).toFixed(2));
    const total = (subtotal + tax + gst).toFixed(2);

    return (
        <>
            <NavBar />
            <div className="checkout-container">
                <div className="steps">
                    <div className="progress-line" style={{ width: `${(step - 1) * 44}%` }}></div>
                    <div onClick={() => handleStepClick(1)} className={step === 1 ? "active-step" : "step"}>🛒 Cart</div>
                    <div onClick={() => handleStepClick(2)} className={step === 2 ? "active-step" : "step"}>📍 Address</div>
                    <div onClick={() => handleStepClick(3)} className={step === 3 ? "active-step" : "step"}>💵 Payment</div>
                </div>

                {error && <div className="error-msg">{error}</div>}

                {step === 1 && (
                    <div className="cart-step">
                        <h2>Your Cart</h2>
                        {cart.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            <>
                                <div className="cart-items">
                                    {cart.map((item) => (
                                        <div key={item._id} className="cart-item">
                                            <h3>{item.name}</h3>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Price: ₹{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="order-summary">
                                    <h3>Subtotal: ₹{subtotal}</h3>
                                </div>
                            </>
                        )}
                        <div className="navigation-buttons-right">
                            <button onClick={handleNext} className="next-btn">Next</button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="address-step">
                        <h2>Delivery Address</h2>
                        <form>
                            {["name", "phone", "address1", "address2", "city", "state", "pincode"].map((field) => (
                                <input
                                    key={field}
                                    name={field}
                                    placeholder={field === "address2" ? "Address Line 2 (Optional)" : field.charAt(0).toUpperCase() + field.slice(1)}
                                    value={address[field]}
                                    onChange={handleChange}
                                    required={field !== "address2"}
                                />
                            ))}
                        </form>
                        <div className="navigation-buttons">
                            <button onClick={handleBack} className="back-btn">Back</button>
                            <button onClick={handleNext} className="next-btn">Next</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="payment-step">
                        <div className="order-summary-box">
                            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Order Summary</h2>
                            <div className="delivery-address">
                                <h3>📍 Delivery Address</h3>
                                <p><strong>{address.name}</strong></p>
                                <p>{address.address1}</p>
                                {address.address2 && <p>{address.address2}</p>}
                                <p>{address.city}, {address.state} - {address.pincode}</p>
                                <p>Phone: {address.phone}</p>
                            </div>
                            <div className="items-section">
                                <h3>🛒 Items:</h3>
                                {cart.map((item) => (
                                    <div key={item._id} className="bill-item">
                                        <span>{item.name} (x{item.quantity})</span>
                                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <hr />
                            <div className="billing-section">
                                <div className="bill-item"><span>Subtotal:</span><span>₹{subtotal}</span></div>
                                <div className="bill-item"><span>Tax (5%):</span><span>₹{tax}</span></div>
                                <div className="bill-item"><span>GST (12%):</span><span>₹{gst}</span></div>
                                <hr />
                                <div className="bill-item total"><span><strong>Total:</strong></span><span><strong>₹{total}</strong></span></div>
                            </div>
                            <div className="confirm-order-container">
                                <button onClick={handleSubmit} className="place-order-btn">Confirm Order</button>
                            </div>
                            <div className="navigation-buttons">
                                <button onClick={handleBack} className="back-btn">Back</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Checkout;
