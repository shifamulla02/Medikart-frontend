import NavBar from "./NavBar";
import { useRef, useState } from "react";
import axios from "axios";
import './App.css'; // Make sure this file has the improved CSS

function AboutUsWithEnquiry() {
    const teamMembers = [
        {
            name: "SHIFA MULLA",
            image: "images/shifa1.jpg",  
            contact: "9930942942",
            email: "shifa@gmail.com"
        },
        {
            name: "HILDA NADAR",
            image: "images/hilda.jpg",  
            contact: "9372925677",
            email: "hilda@gmail.com"
        },
        {
            name: "ELVINA BINOY",
            image: "images/elvina1.jpg",  
            contact: "8652770566",
            email: "elvina@gmail.com"
        },
        {
            name: "JENITA RAJAN",
            image: "images/jenita.jpg", 
            contact: "9653248832",
            email: "jenita@gmail.com"
        }
    ];

    const rName = useRef();
    const rPhone = useRef();
    const rQuery = useRef();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");

    const hName = (event) => setName(event.target.value);
    const hPhone = (event) => setPhone(event.target.value);
    const hQuery = (event) => setQuery(event.target.value);

    const se = (event) => {
        event.preventDefault();
        if (!name || !phone || !query) {
            setMsg("All fields are required.");
            return;
        }

        const data = { name, phone, query };
        const url = "http://localhost:9000/se";

        axios.post(url, data)
            .then((res) => {
                setMsg("We will get back to you soon.");
                setName("");
                setPhone("");
                setQuery("");
                rName.current.focus();
            })
            .catch((err) => {
                const errorMsg = err.response
                    ? err.response.data.error || err.response.data
                    : "Network Error";
                setMsg(`Issue: ${errorMsg}`);
                console.error(err);
            });
    };

    return (
        <>
            <center>
                <NavBar />
                <h1>ABOUT US</h1>
                <div className="about-us-container">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="about-us-box">
                            <img src={member.image} alt={member.name} className="profile-pic" />
                            <h3>{member.name}</h3>
                            <p>Contact: {member.contact}</p>
                            <p>Email: {member.email}</p>
                        </div>
                    ))}
                </div>

                <div className="enquiry-form">
                    <h2>ENQUIRY FORM</h2>
                    <form onSubmit={se}>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={hName}
                            ref={rName}
                            className="input-field"
                        />
                        <input
                            type="number"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={hPhone}
                            ref={rPhone}
                            className="input-field"
                        />
                        <textarea
                            placeholder="Enter your query"
                            value={query}
                            onChange={hQuery}
                            ref={rQuery}
                            className="textarea-field"
                        ></textarea>
                        <button type="submit">Submit</button>
                    </form>
                    {msg && <h2>{msg}</h2>}
                </div>
            </center>
        </>
    );
}

export default AboutUsWithEnquiry;
