import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Switch, FormControlLabel, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserEdit = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const [user, setUser] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      isActive: true,
   });

   const [errors, setErrors] = useState({});
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const fetchUser = async () => {
         try {
            const response = await axios.get(`http://localhost:5001/admin-users/${id}`);
            setUser({
               ...response.data,
               password: "",
               confirmPassword: "",
            });
         } catch (error) {
            console.error("Error fetching user data:", error);
         }
      };

      fetchUser();
   }, [id]);

   const handleChange = (event) => {
      const { name, value, type, checked } = event.target;
      setUser((prevUser) => ({
         ...prevUser,
         [name]: type === "checkbox" ? checked : value,
      }));
   };

   const validate = () => {
      const newErrors = {};
      if (!user.firstname.trim()) newErrors.firstname = "Firstname is required";
      if (!user.lastname.trim()) newErrors.lastname = "Lastname is required";
      if (!user.email.trim()) newErrors.email = "Email is required";
      if (user.password !== user.confirmPassword)
         newErrors.confirmPassword = "Passwords do not match";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (!validate()) return;

      setLoading(true);
      try {
         await axios.put(`http://localhost:5001/admin-users/${id}`, {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isActive: user.isActive,
            password: user.password || undefined,
         });
         navigate("/users");
      } catch (error) {
         console.error("Error updating user:", error);
      } finally {
         setLoading(false);
      }
   };

   return (
       <Box m="1.5rem">
          <Typography variant="h4" color={colors.grey[100]} gutterBottom>
             Edit User
          </Typography>
          <form onSubmit={handleSubmit}>
             <Box display="grid" gap="1.5rem" gridTemplateColumns="1fr 1fr">
                <Box>
                   <TextField
                       fullWidth
                       label="Firstname *"
                       name="firstname"
                       value={user.firstname}
                       onChange={handleChange}
                       error={!!errors.firstname}
                       helperText={errors.firstname}
                   />
                </Box>
                <Box>
                   <TextField
                       fullWidth
                       label="Lastname *"
                       name="lastname"
                       value={user.lastname}
                       onChange={handleChange}
                       error={!!errors.lastname}
                       helperText={errors.lastname}
                   />
                </Box>
                <Box gridColumn="span 2">
                   <TextField
                       fullWidth
                       label="Email *"
                       name="email"
                       value={user.email}
                       onChange={handleChange}
                       error={!!errors.email}
                       helperText={errors.email}
                   />
                </Box>
                <Box>
                   <TextField
                       fullWidth
                       label="Password"
                       name="password"
                       type="password"
                       value={user.password}
                       onChange={handleChange}
                       error={!!errors.password}
                       helperText={errors.password}
                   />
                </Box>
                <Box>
                   <TextField
                       fullWidth
                       label="Confirm Password"
                       name="confirmPassword"
                       type="password"
                       value={user.confirmPassword}
                       onChange={handleChange}
                       error={!!errors.confirmPassword}
                       helperText={errors.confirmPassword}
                   />
                </Box>
                <Box gridColumn="span 2">
                   <FormControlLabel
                       control={
                          <Switch
                              name="isActive"
                              checked={user.isActive}
                              onChange={handleChange}
                          />
                       }
                       label="Active Status"
                   />
                </Box>
             </Box>
             <Box mt="1.5rem">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                >
                   {loading ? "Saving..." : "Save"}
                </Button>
                <Button variant="outlined" onClick={() => navigate("/users")} color="secondary">
                   Cancel
                </Button>
             </Box>
          </form>
       </Box>
   );
};

export default UserEdit;