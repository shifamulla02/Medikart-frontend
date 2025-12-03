import NavBar from "./NavBar";
import { useState, useRef, useContext } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "./Firebase";
import { AuthContext } from "./AuthContext"; // Importing AuthContext
import './App.css';

function Login() {
    const nav = useNavigate();
    const rUsername = useRef();
    const rPassword = useRef();

    const { login } = useContext(AuthContext); // Accessing login function from AuthContext

    // States for role, username, password, and messages
    const [role, setRole] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    // Handlers for form fields
    const hUsername = (event) => setUsername(event.target.value);
    const hPassword = (event) => setPassword(event.target.value);
    const handleRoleChange = (event) => setRole(event.target.value);

    const save = (event) => {
        event.preventDefault();
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, username, password)
            .then(() => {
                localStorage.setItem("un", username);
                login();  // Set user as logged in in the global context
                if (role === "user") nav("/home");
                else if (role === "admin") nav("/admin-dashboard");
                else setMsg("Please select a role.");
            })
            .catch(err => setMsg("Issue: " + err.message));
    };

    return (
        <>
            <NavBar />
            <div className="centered-section">
                <div className="login-box">
                    <h1>Login Page</h1>

                    {!role && (
                        <div>
                            <h2>Select Your Role</h2>
                            <select onChange={handleRoleChange} value={role}>
                                <option value="">Select Role</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    )}

                    {role && (
                        <form onSubmit={save}>
                            <input 
                                type="email" 
                                placeholder="Enter email address" 
                                ref={rUsername} 
                                onChange={hUsername} 
                                value={username} 
                                required 
                            />
                            <input 
                                type="password" 
                                placeholder="Enter password" 
                                ref={rPassword} 
                                onChange={hPassword} 
                                value={password} 
                                required 
                            />
                            <input type="submit" value="Login" />
                        </form>
                    )}

                    <p>
                        Don't have an account? <a href="/signup">Sign up</a>
                    </p>
                    <h2>{msg}</h2>
                </div>
            </div>
        </>
    );
}

export default Login;
