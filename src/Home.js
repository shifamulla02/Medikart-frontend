import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from "./NavBar"; // Import NavBar

function Home() {
  const [info, setInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category

  const images = [
    "/offer1.jpg",
    "/offer2.jpg",
    "/offer3.jpg",
    "/offer1.jpg",
    "/offer2.jpg",
    "/offer4.jpg",
  ];

  const categories = [
    { name: "Cold/Fever", icon: "/icons/coldfever.png" },
    { name: "Diabetes", icon: "/icons/diabetes.png" },
    { name: "Pain Killers", icon: "/icons/painkillers.png" },
    { name: "Antibiotics", icon: "/icons/antibiotic.png" },
    { name: "Vitamins", icon: "/icons/vitamin.png" },
    { name: "Antidepressants", icon: "/icons/antidepressant.png" },
    { name: "BP", icon: "/icons/bp.png" },
    { name: "Heart Disease", icon: "/icons/heartdisease.png" },
  ];

  useEffect(() => {
    // Fetch records from backend
    axios.get("http://localhost:9000/api/records")
      .then((res) => setInfo(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Filter records based on the search term and selected category
  const filteredInfo = info.filter(item =>
    (!searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!selectedCategory || item.category === selectedCategory)
  );

  return (
    <div className="home-page">
      {/* Navbar Component */}
      <NavBar />
      <center>
        <h1>Home Page</h1>

        {/* Search Bar */}
        <div className="search-bar">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Image Slider */}
        <div className="image-slider">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Offer ${index + 1}`}
              className="slider-image"
            />
          ))}
        </div>

        {/* Categorization Icons */}
        <div className="categories">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`category-icon ${selectedCategory === category.name ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <img src={category.icon} alt={category.name} className="category-image" />
              <p>{category.name}</p>
            </div>
          ))}
        </div>

        {/* Table for Records */}
        <table border="1" className="data-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>CATEGORY</th>
              <th>MRP(₹)</th>
              <th>MFG</th>
              <th>EXP</th>
            </tr>
          </thead>
          <tbody>
            {filteredInfo.map((item) => (
              <tr key={item._id}>
                <td>{item.sno}</td>
                {/* Link to medicine detail page in a new tab */}
                <td>
                  <a
                    href={`/medicine/${item._id}`}  // Using normal anchor tag for new tab
                    target="_blank"
                    rel="noopener noreferrer"
                    className="medicine-link"
                  >
                    {item.name}
                  </a>
                </td>
                <td>{item.category}</td>
                <td>{item.mrp}</td>
                <td>{item.mfg}</td>
                <td>{item.exp}</td>
              </tr>
            ))}
          </tbody>
        </table>
	<br/><br/>
      </center>
    </div>
  );
}

export default Home;
