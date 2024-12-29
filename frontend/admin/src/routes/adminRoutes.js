import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUserList from '../pages/admin/AdminUserList';
import AdminUserEdit from '../pages/admin/AdminUserEdit';
import AdminUserCreate from '../pages/admin/AdminUserCreate';

const AdminRoutes = () => (
    <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUserList />} />
        <Route path="/admin/users/create" element={<AdminUserCreate />} />
        <Route path="/admin/users/:id" element={<AdminUserEdit />} />
    </Routes>
);

export default AdminRoutes;