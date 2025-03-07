import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ColorPicker from "./components/ColorPicker";
import './App.css'

const Navbar = () => (
  <nav className="bg-[#111] p-4 text-white flex justify-between items-center shadow-md fixed w-full z-50">
    <Link to="/" className="text-xl font-semibold hover:text-gray-300 transition">📦 Add Box</Link>
    <Link to="/list" className="text-xl font-semibold hover:text-gray-300 transition">📋 Box List</Link>
  </nav>
);

const Form = () => {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [destination, setDestination] = useState("Sweden");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const destinations = {
    Sweden: 7.35,
    China: 11.53,
    Brazil: 15.63,
    Australia: 50.09,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setError("Receiver name is required.");
    if (!weight || isNaN(weight) || weight <= 0) return setError("Weight must be a positive number.");

    const newBox = { 
      name, 
      weight: parseFloat(weight), 
      color, 
      destination, 
      cost: weight * destinations[destination] 
    };

    try {
      const response = await fetch("http://localhost:3000/api/boxes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBox),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
        setName("");
        setWeight("");
        setColor("#ffffff");
        setDestination("Sweden");
        setError("");
      } else {
        setError(data.message || "Failed to add box.");
      }
    } catch {
      setError("Error connecting to the server");
    }
  };

  return (
    <div className="p-8 bg-[#181818] text-white min-h-screen flex flex-col items-center pt-20">
      <h2 className="text-4xl font-bold mb-6">📦 Add a Shipping Box</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">✅ Box added successfully!</p>}
      <form onSubmit={handleSubmit} className="p-6 bg-[#222222]/70 backdrop-blur-lg shadow-lg rounded-xl flex flex-col gap-4 w-full max-w-md">
        <input className="p-3 bg-[#333] rounded-lg border border-[#444] text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none" type="text" placeholder="Receiver Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="p-3 bg-[#333] rounded-lg border border-[#444] text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none" type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value.replace(/[^0-9.]/g, ""))} />
        <ColorPicker setColor={setColor} color={color} />
        <select className="p-3 bg-[#333] rounded-lg border border-[#444] text-white focus:ring-2 focus:ring-blue-500 outline-none" value={destination} onChange={(e) => setDestination(e.target.value)}>
          {Object.keys(destinations).map((dest) => (
            <option key={dest} value={dest}>{dest}</option>
          ))}
        </select>
        <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md" type="submit">🚀 Save</button>
      </form>
    </div>
  );
};

const List = () => {
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/boxes")
      .then((res) => res.json())
      .then((data) => {
        setBoxes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 bg-[#181818] text-white min-h-screen pt-20">
      <h2 className="text-4xl font-bold mb-6">📋 Box List</h2>
      {loading ? (
        <p className="text-center">⏳ Loading...</p>
      ) : boxes.length === 0 ? (
        <p className="text-center">🚫 No boxes found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-[#222222]/70 backdrop-blur-lg shadow-lg rounded-xl text-white">
            <thead className="bg-[#111]">
              <tr>
                <th className="p-3">Receiver</th>
                <th className="p-3">Weight (kg)</th>
                <th className="p-3">Color</th>
                <th className="p-3">Destination</th>
                <th className="p-3">Cost (INR)</th>
              </tr>
            </thead>
            <tbody>
              {boxes.map((box, index) => (
                <tr key={index} className={`border-b border-[#444] ${index % 2 === 0 ? "bg-[#222]" : "bg-[#333]"}`}>
                  <td className="p-3">{box.name}</td>
                  <td className="p-3">{box.weight}</td>
                  <td className="p-3 flex items-center justify-center">
                    <div style={{ backgroundColor: box.color }} className="w-6 h-6 rounded border border-white"></div>
                  </td>
                  <td className="p-3">{box.destination}</td>
                  <td className="p-3">₹{box.cost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </Router>
  );
};

export default App;
