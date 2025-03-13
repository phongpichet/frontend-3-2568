import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";


const Home = () => {
    // รายการสินค้า
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleAddProduct = (newProduct) => {
        setProducts([...products, { id: products.length + 1, ...newProduct }]);
        setShowForm(false); // ปิดฟอร์มหลังเพิ่มสินค้า
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/login");
    };
    const products = [
        { id: 1, name: "ไม้แบดมินตัน", price: 99, image: "https://media.thairath.co.th/image/lNtepLubPpw2EMZcAp1V2PFs1a2h4xB6tXDSv9GYoaAwRbK930e9vA1.webp", description: "ไม้แบดมินตันอยู่ในสภาพดี คุณภาพดี", className:"w-64 h-64 object-cover rounded-lg mx-auto" },
        { id: 2, name: "รองเท้าสตั๊ด", price: 200, image: "https://down-th.img.susercontent.com/file/e03cee463c86d6a743ad101d86827ccd", description: "ถูกเก็บรักษาอย่างดี เหมือนใหม่",className:"w-64 h-64 object-cover rounded-lg mx-auto" },
        { id: 3, name: "ไม้ปิงปอง", price: 50, image: "https://img-187.uamulet.com/auction2hand/mPriceBayGImages_2H/2018/8/15/167-U1648933-636699220234866496-1.jpg", description: "ไม้ปิงปองไม่ใช้แล้ว ไม่มีรอย สภาพดี",className:"w-64 h-64 object-cover rounded-lg mx-auto" },
        { id: 4, name: "ไม้เทนนิส", price: 300, image: "https://inwfile.com/s-dy/8qw4q4.jpg", description: "ไม้เทนนิส มือสองของแท้" },
        { id: 5, name: "ไม้กอล์ฟ", price: 550, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8q7_abjaNuquo5WqikU_jKOn9x_hzs7LHig&s", description: "ไม้กอล์ฟสภาพดี สวยงามเหมือนใหม่" },
        { id: 6, name: "ลูกกอล์ฟ", price: 100, image: "https://inwfile.com/s-cn/2n1p4t.jpg", description: "ลูกกอล์ฟมือสองทุกสภาพ จำหน่ายลูกกอล์ฟ" },
        { id: 7, name: "ลูกบอล", price: 300, image: "https://down-th.img.susercontent.com/file/357fdb69fc8cdd9cb13b52495dcbc26a", description: "ลูกบอลเก่าความทน 100% คุณภาพดี" },
        { id: 8, name: "หมวกจักรยาน", price: 1200, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5WpQpAtY8j6JlgEhgjDrHDKBxWRDf34mdygd0PplSZwh0fMkXObjoNRJNIpohMpNDza0&usqp=CAU", description: "หมวกแบรนด์แท้ หมวก Oakley รุ่น ARO3 สภาพดีทุกส่วน สีสวยเหมือนใหม่" },
        { id: 9, name: "ลูกเบตอง", price: 55, image: "https://cdn.ennxo.com/uploads/products/640/7a28f348a25c48afa8209f867b6fc56b.jpg", description: "ลูกเบตองมือสอง" },
    ];

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [isOrderOpen, setIsOrderOpen] = useState(false);
    const [expandedOrder, setExpandedOrder] = useState(null);

    const openModal = (product) => {
        setSelectedProduct(product);
        setQuantity(1);
    };
    const closeModal = () => {
        setSelectedProduct(null);
    };

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const addToCart = () => {
        const existingProduct = cart.find(item => item.id === selectedProduct.id);
        if (existingProduct) {
            setCart(cart.map(item => 
                item.id === selectedProduct.id ? { ...item, quantity: item.quantity + quantity } : item
            ));
        } else {
            setCart([...cart, { ...selectedProduct, quantity }]);
        }
        closeModal();
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const confirmOrder = () => {
        if (cart.length === 0) return;

        const newOrder = {
            id: new Date().getTime(),
            items: cart,
            total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        };

        setOrders([...orders, newOrder]);
        setCart([]);
        setIsCartOpen(false);
        alert("✅ สั่งซื้อสำเร็จ!");
    };

    const toggleOrder = () => {
        setIsOrderOpen(!isOrderOpen);
    };

    const toggleOrderDetails = (id) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    const removeOrder = (id) => {
        setOrders(orders.filter(order => order.id !== id));
    };

    return (
        
        <div className="min-h-screen bg-gray-100 p-6">
            <nav className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
                <h1 className="text-xl font-bold text-blue-600">ร้านสินค้ากีฬามือสอง</h1>
                <div>
                    {/* ถ้าล็อกอินแล้ว แสดงปุ่มเพิ่มสินค้า */}
      {isLoggedIn && (
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          เพิ่มสินค้า
        </button>
      )}
                {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2">Login</Link>
                            <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded-lg mr-4">Register</Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                            Logout
                        </button>
                    )}
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2" onClick={toggleCart}>
                        🛒 ตะกร้า ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                    </button>
                    <button className="px-4 py-2 bg-purple-500 text-white rounded-lg" onClick={toggleOrder}>
                        📦 Order
                    </button>
                    
                        <div className="mt-6 text-center">
                <h2 className="text-2xl font-bold text-gray-700">
                    {isLoggedIn ? "ยินดีต้อนรับกลับมา!" : "กรุณาเข้าสู่ระบบ"}
                </h2>
            </div>
                </div>
            </nav>

            {selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h2>
                        <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-56 object-cover rounded-lg my-3" />
                        <p className="text-gray-600">{selectedProduct.description}</p>
                        <p className="text-xl font-semibold text-blue-600 mt-2">{selectedProduct.price.toLocaleString()} บาท</p>

                        {/* จำนวนสินค้า */}
                        <div className="flex items-center justify-between mt-4">
                            <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg" onClick={decreaseQuantity}>-</button>
                            <span className="text-lg font-bold">{quantity}</span>
                            <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg" onClick={increaseQuantity}>+</button>
                        </div>

                        {/* ราคารวม */}
                        <p className="text-lg font-semibold text-green-600 mt-2">
                            รวม: {(selectedProduct.price * quantity).toLocaleString()} บาท
                        </p>

                        {/* ปุ่มต่าง ๆ */}
                        <div className="mt-4 flex justify-between">
                            <button className="px-4 py-2 bg-gray-400 text-white rounded-lg" onClick={closeModal}>ปิด</button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={addToCart}>
                                เพิ่มเข้าตะกร้า
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ตะกร้าสินค้า */}
            {isCartOpen && (
                <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4">
                    <h2 className="text-xl font-bold">🛒 ตะกร้าสินค้า</h2>
                    {cart.length === 0 ? (
                        <p className="text-gray-600 mt-4">ไม่มีสินค้าในตะกร้า</p>
                    ) : (
                        <ul className="mt-4">
                            {cart.map((item) => (
                                <li key={item.id} className="flex justify-between items-center border-b py-2">
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p>{item.quantity} x {item.price} = {(item.quantity * item.price).toLocaleString()} บาท</p>
                                    </div>
                                    <button className="text-red-500" onClick={() => removeFromCart(item.id)}>🗑</button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg" onClick={confirmOrder}>
                        ✅ ยืนยันสั่งซื้อ
                    </button>
                    <button className="mt-2 w-full bg-gray-500 text-white py-2 rounded-lg" onClick={toggleCart}>ปิด</button>
                </div>
            )}

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
                        <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
                        <p className="text-gray-700">ราคา: {product.price} บาท</p>
                        <button 
                            className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg"
                            onClick={() => openModal(product)}
                        >
                            ดูรายละเอียด
                        </button>
                    </div>
                ))}
            </div>

            {isOrderOpen && (
                <div className="fixed top-0 left-0 w-80 h-full bg-white shadow-lg p-4">
                    <h2 className="text-xl font-bold">📦 Order</h2>
                    {orders.length === 0 ? (
                        <p className="text-gray-600 mt-4">ไม่มีรายการสั่งซื้อ</p>
                    ) : (
                        <ul className="mt-4">
                            {orders.map((order) => (
                                <li key={order.id} className="border-b py-2">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                                            Order #{order.id}
                                        </h3>
                                        <button className="text-red-500" onClick={() => removeOrder(order.id)}>🗑 ยกเลิก</button>
                                    </div>
                                    <p>ยอดรวม: {order.total.toLocaleString()} บาท</p>
                                    {expandedOrder === order.id && (
                                        <ul className="mt-2 bg-gray-100 p-2 rounded-lg">
                                            {order.items.map((item) => (
                                                <li key={item.id} className="text-sm">
                                                    {item.name} - {item.quantity} x {item.price} = {(item.quantity * item.price).toLocaleString()} บาท
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                    <button className="mt-4 w-full bg-gray-500 text-white py-2 rounded-lg" onClick={toggleOrder}>ปิด</button>
                </div>
            )}
        </div>
        
    );
};

export default Home;
