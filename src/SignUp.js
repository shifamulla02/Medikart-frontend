import NavBar from "./NavBar"; 
import { useState, useRef } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './App.css'; // Reuse the same CSS file as Login

function SignUp() {
    const nav = useNavigate();
    const rUsername = useRef();
    const rPassword1 = useRef();
    const rPassword2 = useRef();

    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [msg, setMsg] = useState("");

    const hUsername = (event) => { setUsername(event.target.value); }
    const hPassword1 = (event) => { setPassword1(event.target.value); }
    const hPassword2 = (event) => { setPassword2(event.target.value); }

    const save = (event) => {
        event.preventDefault();
        
        if (password1 === password2) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, username, password1)
                .then(res => {
                    nav("/");
                })
                .catch(err => {
                    setMsg("Issue: " + err.message);
                });
        } else {
            setMsg("Passwords did not match");
            setPassword1("");
            setPassword2("");
            rPassword1.current.focus();
        }
    }

    return (
        <>
            <center>
                <NavBar />
                <h1>Sign Up</h1>
                <div className="login-box">
                    <form onSubmit={save}>
                        <input 
                            type="email" 
                            placeholder="Enter email address" 
                            ref={rUsername} 
                            onChange={hUsername} 
                            value={username} 
                        />
                        <br /><br />
                        <input 
                            type="password" 
                            placeholder="Enter password" 
                            ref={rPassword1} 
                            onChange={hPassword1} 
                            value={password1} 
                        />
                        <br /><br />
                        <input 
                            type="password" 
                            placeholder="Re-enter password" 
                            ref={rPassword2} 
                            onChange={hPassword2} 
                            value={password2} 
                        />
                        <br /><br />
                        <input type="submit" value="Register" />
                    </form>
                    <h2>{msg}</h2>
                </div>
            </center>
        </>
    );
}

export default SignUp;
