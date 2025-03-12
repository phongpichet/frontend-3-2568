import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
        navigate("/");
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <nav className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
                <h1 className="text-xl font-bold text-blue-600">Admin Dashboard</h1>
            </nav>
            <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold">จัดการข้อมูล</h2>
                <p className="text-gray-600">คุณสามารถเพิ่ม ลบ และแก้ไขข้อมูลทั้งหมดได้</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
