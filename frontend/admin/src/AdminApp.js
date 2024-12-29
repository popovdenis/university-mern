import React from 'react';
import { Admin, Resource, List, Edit, Create, SimpleForm, TextInput, BooleanInput, Datagrid, TextField, PasswordInput, BooleanField } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('http://localhost:5001');

// Список администраторов
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

// Форма редактирования администратора
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

// Форма создания администратора
const AdminUserCreate = (props) => (
    <Create {...props} redirect="list"> {/* Добавляем redirect */}
        <SimpleForm>
            <TextInput source="firstname" />
            <TextInput source="lastname" />
            <TextInput source="email" />
            <PasswordInput source="password" />
            <BooleanInput source="isActive" />
        </SimpleForm>
    </Create>
);

const AdminApp = () => (
    <Admin dataProvider={dataProvider}>
        <Resource
            name="admin-users"
            list={AdminUserList}
            edit={AdminUserEdit}
            create={AdminUserCreate}
        />
    </Admin>
);

export default AdminApp;