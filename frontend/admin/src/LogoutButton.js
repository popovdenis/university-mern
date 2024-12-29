import React from 'react';
import { useLogout } from 'react-admin';

const LogoutButton = () => {
    const logout = useLogout();

    const handleLogout = (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение ссылки или формы
        localStorage.removeItem('authToken'); // Удаляем токен
        logout(); // Завершаем сессию и перенаправляем
    };

    return (
        <button
            onClick={handleLogout}
            style={{
                margin: '1rem',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                backgroundColor: '#f44336',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
            }}
        >
            Logout
        </button>
    );
};

export default LogoutButton;