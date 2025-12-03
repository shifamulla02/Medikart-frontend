import { useNavigate } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <>
            <NavBar />
            <center>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                    <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
                    <div className="space-y-6">
                        <button 
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            onClick={() => navigate("/create")}
                        >
                            Create Medicine
                        </button>
<br/><br/>
                        <button 
                            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            onClick={() => navigate("/delete-medicine")}
                        >
                            Delete Medicine
                        </button>
<br/><br/>
                        <button 
                            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            onClick={() => navigate("/view-medicine")}
                        >
                            View All Medicines
                        </button>
                    </div>
                </div>
            </center>
        </>
    );
};

export default AdminDashboard;
