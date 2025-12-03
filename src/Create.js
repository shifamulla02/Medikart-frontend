import NavBar from "./NavBar";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

function Create() {
    const rName = useRef();

    const [name, setName] = useState("");
    const [mrp, setMrp] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [mfg, setMfg] = useState(new Date());
    const [exp, setExp] = useState(new Date());
    const [msg, setMsg] = useState("");

    useEffect(() => {
        rName.current.focus();
    }, []);

    const save = async (event) => {
        event.preventDefault();

        if (!name || !mrp || !category || !description || !image) {
            setMsg("Please fill all fields.");
            return;
        }

        const data = {
    name,
    mrp,
    category,
    description,
    imageUrl: image,  // ✅ Use `imageUrl` instead of `image`
    mfg: mfg.toISOString().split("T")[0],
    exp: exp.toISOString().split("T")[0],
};


        try {
            await axios.post("http://localhost:9000/api/records", data);
            setMsg("✅ Record created successfully.");
            setName("");
            setMrp("");
            setCategory("");
            setDescription("");
            setImage("");
            setMfg(new Date());
            setExp(new Date());
            rName.current.focus();
        } catch (err) {
            console.error(err);
            setMsg("❌ Failed to create record.");
        }
    };

    return (
        <>
            <NavBar />
            <div className="enquiry-form">
                <h2>Create Medicine Record</h2>
                <form onSubmit={save}>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Medicine Name"
                        ref={rName}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="number"
                        className="input-field"
                        placeholder="MRP"
                        value={mrp}
                        onChange={(e) => setMrp(e.target.value)}
                    />
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <textarea
                        className="textarea-field"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    {image && <img src={image} alt="Preview" style={{ maxWidth: '100px', borderRadius: '10px', marginBottom: '10px' }} />}

<br/><br/>
                    <label style={{ fontWeight: "bold", color: "#800000", fontSize: "18px" }}>MFG Date:</label>
                    <DatePicker selected={mfg} onChange={(date) => setMfg(date)} className="input-field" />
<br/><br/>
                    <label style={{ fontWeight: "bold", color: "#800000", fontSize: "18px" }}>EXP Date:</label>
                    <DatePicker
  selected={exp}
  onChange={(date) => setExp(date)}
  className="input-field"
/>



                    <button type="submit">Save Record</button>
                </form>

                {msg && <h2 className="msg">{msg}</h2>}
            </div>
        </>
    );
}

export default Create;
