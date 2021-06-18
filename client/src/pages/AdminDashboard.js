import { CssBaseline } from '@material-ui/core';
import React from 'react';
import AdminNav from '../components/Navbars/AdminNav';

const AdminDashboard = () => {
    return (
        <div>
            <CssBaseline/>
            <AdminNav/>
        </div>
    );
};

export default AdminDashboard;