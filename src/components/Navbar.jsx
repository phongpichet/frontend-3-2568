import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <nav className="flex justify-between items-center bg-white shadow-md p-4">
            <h1 className="text-xl font-bold text-blue-600">ร้านสินค้ามือสอง</h1>
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <span className="text-gray-700">👤 {user.username}</span>
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded">Login</Link>
                        <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
