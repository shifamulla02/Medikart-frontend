import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";

function ViewMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/records")
      .then((res) => {
        // Assign stock with 80% chance of being in stock
        const formattedData = res.data.map((medicine) => ({
          ...medicine,
          sno: String(medicine.sno),
          mrp: Number(medicine.mrp).toFixed(2),
          mfg: new Date(medicine.mfg).toLocaleDateString(),
          exp: new Date(medicine.exp).toLocaleDateString(),
          stock: Math.random() > 0.2 ? Math.floor(Math.random() * 50) + 1 : 0, // 80% chance in stock, 20% out
        }));
        setMedicines(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching medicines:", err);
        setError("Failed to load medicines. Try again later.");
        setLoading(false);
      });
  }, []);

  // Calculate stock counts
  const inStock = medicines.filter(medicine => medicine.stock > 0).length;
  const outOfStock = medicines.filter(medicine => medicine.stock === 0).length;

  if (loading) return <p>Loading medicines...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="view-medicines">
      <NavBar />
      <center>
        <h1>Available Medicines</h1>

        {/* Display In-Stock and Out-of-Stock Counts */}
        <div className="medicine-stats">
          <p style={{ color: "green" }}><strong>In Stock:</strong> {inStock}</p>
          <p style={{ color: "red" }}><strong>Out of Stock:</strong> {outOfStock}</p>
        </div>

        <table border="1" className="data-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Category</th>
              <th>MRP (₹)</th>
              <th>MFG</th>
              <th>EXP</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine._id}>
                <td>{medicine.sno}</td>
                <td>{medicine.name}</td>
                <td>{medicine.category}</td>
                <td>{medicine.mrp}</td>
                <td>{medicine.mfg}</td>
                <td>{medicine.exp}</td>
                <td style={{ color: medicine.stock === 0 ? "red" : "green" }}>
                  {medicine.stock === 0 ? "Out of Stock" : medicine.stock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </div>
  );
}

export default ViewMedicines;
