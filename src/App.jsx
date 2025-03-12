import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
//import ProductManagement from "./pages/ProductManagement";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Orders from "./pages/Orders";

const PrivateRoute = ({ element }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.role === "admin" ? element : <Navigate to="/" />;
};
function App() {
  
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} /> 
                <Route path="/register" element={<Register />} />
                {/* จำกัดสิทธิ์เฉพาะ Admin */}
                <Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} />} />
                {/* <Route path="/products" element={<ProductManagement />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />  */}
            </Routes>
        </Router>
    );
}

export default App;
