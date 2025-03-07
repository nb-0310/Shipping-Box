import { Link } from "react-router-dom"

const Navbar = () => (
  <nav className="bg-[#111] p-4 text-white flex justify-between items-center shadow-md fixed w-full z-50">
    <Link
      to="/"
      className="text-xl font-semibold hover:text-gray-300 transition"
    >
      📦 Add Box
    </Link>
    <Link
      to="/list"
      className="text-xl font-semibold hover:text-gray-300 transition"
    >
      📋 Box List
    </Link>
  </nav>
)

export default Navbar
