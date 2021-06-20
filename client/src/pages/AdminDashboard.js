import { CssBaseline } from '@material-ui/core';
import React from 'react';
import AdminNav from '../components/Navbars/AdminNav';
import AdminPanel from '../components/AdminPanel';
const AdminDashboard = () => {
    return (
        <div>
            <CssBaseline/>
            <AdminNav/>
            <AdminPanel/>
        </div>
    );
};

export default AdminDashboard;