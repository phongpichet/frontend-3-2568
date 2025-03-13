import React, { useState } from "react";

export default function UserProductPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "" });
  
  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    const id = products.length + 1;
    setProducts([...products, { id, ...newProduct, quantity: 1 }]);
    setNewProduct({ name: "", price: "", description: "" });
  };

  const updateQuantity = (id, change) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: Math.max(1, product.quantity + change) } : product
    ));
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">เพิ่มสินค้า</h2>
      <div className="flex gap-2 mt-2">
        <input className="border p-2" type="text" placeholder="ชื่อสินค้า" value={newProduct.name} 
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input className="border p-2" type="number" placeholder="ราคา" value={newProduct.price} 
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
        <input className="border p-2" type="text" placeholder="รายละเอียด" value={newProduct.description} 
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
        <button className="bg-blue-500 text-white p-2" onClick={addProduct}>เพิ่มสินค้า</button>
      </div>
      
      <h2 className="text-xl font-bold mt-5">รายการสินค้า</h2>
      {products.map(product => (
        <div key={product.id} className="border p-3 mt-2">
          <h3 className="font-bold">{product.name}</h3>
          <p>ราคา: {product.price} บาท</p>
          <p>{product.description}</p>
          <div className="flex gap-2 mt-2">
            <button className="bg-gray-300 p-2" onClick={() => updateQuantity(product.id, -1)}>-</button>
            <span>{product.quantity}</span>
            <button className="bg-gray-300 p-2" onClick={() => updateQuantity(product.id, 1)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}
