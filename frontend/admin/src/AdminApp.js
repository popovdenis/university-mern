import React, { useState } from 'react';
import { Admin, Resource, Layout, AppBar, UserMenu } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { List, Edit, Create, SimpleForm, TextInput, BooleanInput, Datagrid, TextField, PasswordInput, BooleanField } from 'react-admin';
import LogoutButton from './LogoutButton';
import LoginPage from './LoginPage';

const dataProvider = jsonServerProvider('http://localhost:5001');

const CustomUserMenu = (props) => (
    <UserMenu {...props}>
        <LogoutButton />
    </UserMenu>
);

const CustomAppBar = (props) => <AppBar {...props} userMenu={<CustomUserMenu />} />;

const CustomLayout = (props) => <Layout {...props} appBar={CustomAppBar} />;

const AdminUserList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="firstname" />
            <TextField source="lastname" />
            <TextField source="email" />
            <BooleanField source="isActive" />
        </Datagrid>
    </List>
);

const AdminUserEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="firstname" />
            <TextInput source="lastname" />
            <TextInput source="email" />
            <PasswordInput source="password" />
            <BooleanInput source="isActive" />
        </SimpleForm>
    </Edit>
);

const AdminUserCreate = (props) => (
    <Create {...props} redirect="list">
        <SimpleForm>
            <TextInput source="firstname" />
            <TextInput source="lastname" />
            <TextInput source="email" />
            <PasswordInput source="password" />
            <BooleanInput source="isActive" />
        </SimpleForm>
    </Create>
);

const AdminApp = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('authToken');
    };

    return isAuthenticated ? (
        <Admin
            dataProvider={dataProvider}
            layout={CustomLayout} // Подключаем кастомный layout
        >
            <Resource
                name="admin-users"
                list={AdminUserList}
                edit={AdminUserEdit}
                create={AdminUserCreate}
            />
        </Admin>
    ) : (
        <LoginPage onLogin={handleLogin} />
    );
};

export default AdminApp;