import { Link } from "react-router-dom"
import "./Navbar.style.css"

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/animals">Animal</Link>
            <Link to="/appointments">Appointment</Link>
            <Link to="/customers">Customer</Link>
            <Link to="/doctors">Doctor</Link>
            <Link to="/reports">Report</Link>
            <Link to="/vaccines">Vaccine</Link>
        </div>
    )
                
}
export default Navbar