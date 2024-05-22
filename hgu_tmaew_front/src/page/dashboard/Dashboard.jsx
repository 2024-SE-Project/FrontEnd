import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import '../css/Dashboard.css'; // Dashboard.css 파일 import

export default function Dashboard() {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}
