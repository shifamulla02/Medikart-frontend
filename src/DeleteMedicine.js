import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './App.css';
import NavBar from "./NavBar";

const DeleteMedicine = () => {
    const navigate = useNavigate();
    const [medicinename, setMedicinename] = useState("");
    const [medicines, setMedicines] = useState([]);

    // Fetch all medicines when component mounts
    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const res = await axios.get("http://localhost:9000/api/records");
                setMedicines(res.data);
            } catch (error) {
                console.error("Error fetching medicines:", error);
            }
        };
        fetchMedicines();
    }, []);

    const handleDelete = async () => {
        const trimmedName = medicinename.trim();
        if (!trimmedName) {
            alert("Please enter a valid Medicine Name!");
            return;
        }

        // Find the medicine ID based on the name
        const medicineToDelete = medicines.find(med => med.name.toLowerCase() === trimmedName.toLowerCase());
        if (!medicineToDelete) {
            alert("Medicine not found!");
            return;
        }

        console.log("Deleting medicine:", medicineToDelete._id); // Debugging log

        try {
            await axios.delete(`http://localhost:9000/api/records/${medicineToDelete._id}`);
            console.log("Deleted successfully!");
            alert("Medicine deleted successfully!");

            setMedicinename(""); // Clear input field
            navigate("/admin-dashboard"); // Redirect after deletion
        } catch (error) {
            console.error("Error deleting medicine:", error.response?.data || error.message);
            alert("Failed to delete medicine. Check console for details.");
        }
    };

    return (
        <>
            <NavBar />
            <center>
                <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                    <h1 className="text-3xl font-bold mb-6">Delete Medicine</h1>
                    
                   <input 
    type="text" 
    placeholder="Enter Medicine Name" 
    value={medicinename} 
    onChange={(e) => setMedicinename(e.target.value)}
    style={{
        padding: "10px 8px",
        fontSize: "25px",
        width: "500px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        marginBottom: "15px"
    }}
/>

                    <br/><br/>

                    <button 
                        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={handleDelete}
                    >
                        Delete Medicine
                    </button>
                    <br/><br/>

                    <button 
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        onClick={() => navigate("/admin-dashboard")}
                    >
                        Back to Dashboard
                    </button>
                    <br/><br/>
                </div>
            </center>
        </>
    );
};

export default DeleteMedicine;
