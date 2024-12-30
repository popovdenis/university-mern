import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

function UsersEdit() {
   const { id } = useParams(); // Получаем ID пользователя из URL
   const navigate = useNavigate();
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const [user, setUser] = useState({
      firstname: "",
      lastname: "",
      email: "",
      isActive: false,
   });
   const [loading, setLoading] = useState(true);

   // Загрузка данных пользователя
   useEffect(() => {
      const fetchUser = async () => {
         try {
            const response = await axios.get(`http://localhost:5001/admin-users/${id}`);
            setUser(response.data);
            setLoading(false);
         } catch (error) {
            console.error("Error fetching user:", error);
            setLoading(false);
         }
      };

      fetchUser();
   }, [id]);

   // Обработчик изменения полей формы
   const handleChange = (e) => {
      const { name, value } = e.target;
      setUser((prevUser) => ({
         ...prevUser,
         [name]: value,
      }));
   };

   // Сохранение изменений
   const handleSave = async () => {
      try {
         await axios.put(`http://localhost:5001/admin-users/${id}`, user);
         navigate("/users"); // Редирект обратно на список пользователей
      } catch (error) {
         console.error("Error updating user:", error);
      }
   };

   // Если данные еще загружаются
   if (loading) {
      return <Typography>Loading...</Typography>;
   }

   return (
       <Box m="1rem">
          <Typography variant="h4" color={colors.grey[100]} gutterBottom>
             Edit User
          </Typography>
          <Box
              component="form"
              sx={{
                 display: "flex",
                 flexDirection: "column",
                 gap: "1rem",
                 maxWidth: "400px",
              }}
          >
             <TextField
                 label="Firstname"
                 name="firstname"
                 value={user.firstname}
                 onChange={handleChange}
                 fullWidth
             />
             <TextField
                 label="Lastname"
                 name="lastname"
                 value={user.lastname}
                 onChange={handleChange}
                 fullWidth
             />
             <TextField
                 label="Email"
                 name="email"
                 value={user.email}
                 onChange={handleChange}
                 fullWidth
             />
             <TextField
                 label="Status (Active: true / false)"
                 name="isActive"
                 value={user.isActive}
                 onChange={(e) => handleChange({ target: { name: "isActive", value: e.target.value === "true" } })}
                 fullWidth
             />
             <Box sx={{ display: "flex", gap: "1rem" }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                   Save
                </Button>
                <Button variant="outlined" onClick={() => navigate("/users")}>
                   Cancel
                </Button>
             </Box>
          </Box>
       </Box>
   );
}

export default UsersEdit;