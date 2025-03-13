import React, { useState } from "react";

const ProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  // ฟังก์ชันส่งข้อมูลสินค้าไปยัง Home
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !image || !description) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    onAddProduct({ name, price, image, description });
    setName(""); setPrice(""); setImage(""); setDescription(""); // ล้างฟอร์ม
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">เพิ่มสินค้า</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="ชื่อสินค้า" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded mb-2" />
          <input type="text" placeholder="URL รูปภาพ" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-2 border rounded mb-2" />
          <input type="number" placeholder="ราคา" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded mb-2" />
          <textarea placeholder="รายละเอียดสินค้า" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded mb-2"></textarea>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">เพิ่มสินค้า</button>
          <button type="button" onClick={() => onAddProduct(null)} className="bg-gray-500 text-white px-4 py-2 rounded w-full mt-2">ยกเลิก</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
