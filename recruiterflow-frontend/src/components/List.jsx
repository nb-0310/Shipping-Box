import { useState, useEffect } from "react"

const List = () => {
  const [boxes, setBoxes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:3000/api/boxes")
      .then((res) => res.json())
      .then((data) => {
        setBoxes(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

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
                <tr
                  key={index}
                  className={`border-b border-[#444] ${
                    index % 2 === 0 ? "bg-[#222]" : "bg-[#333]"
                  }`}
                >
                  <td className="p-3">{box.name}</td>
                  <td className="p-3">{box.weight}</td>
                  <td className="p-3 flex items-center justify-center">
                    <div
                      style={{ backgroundColor: box.color }}
                      className="w-6 h-6 rounded border border-white"
                    ></div>
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
  )
}

export default List
