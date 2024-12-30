import React, { useState } from "react";
import {Box, TextField, Button, Typography, FormControlLabel, Switch} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {tokens} from "../../theme";
import {useTheme} from "@mui/material/styles";

function CreateUser() {
   const navigate = useNavigate();
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [errors, setErrors] = useState({});
   const [loading, setLoading] = useState(false);
   const [formData, setFormData] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      isActive: true,
   });

   const handleChange = (event) => {
      const { name, value, type, checked } = event.target;
      setFormData((prevUser) => ({
         ...prevUser,
         [name]: type === "checkbox" ? checked : value,
      }));
   };

   const validate = () => {
      const newErrors = {};
      if (!formData.firstname.trim()) {
         newErrors.firstname = "Firstname is required";
      }
      if (!formData.lastname.trim()) {
         newErrors.lastname = "Lastname is required";
      }
      if (!formData.email.trim()) {
         newErrors.email = "Email is required";
      }
      if (formData.password !== formData.confirmPassword) {
         newErrors.confirmPassword = "Passwords do not match";
      }

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      if (!validate()) return;

      setLoading(true);
      try {
         await axios.post("http://localhost:5001/admin-users", {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            isActive: formData.isActive,
            password: formData.password || undefined,
         });
         navigate("/users");
      } catch (error) {
         console.log("Error while adding user:", error);
      } finally {
         setLoading(false);
      }
   };

   return (
       <Box m="2rem">
          <Typography variant="h4" color={colors.grey[100]} gutterBottom>
             Create New User
          </Typography>
          <form onSubmit={handleSubmit}>
             <Box display="grid" gap="1.5rem" gridTemplateColumns="1fr 1fr">
                <Box>
                   <TextField
                       fullWidth
                       label="Firstname *"
                       name="firstname"
                       value={formData.firstname}
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
                       value={formData.lastname}
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
                       value={formData.email}
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
                       value={formData.password}
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
                       value={formData.confirmPassword}
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
                              checked={formData.isActive}
                              onChange={handleChange}
                          />
                       }
                       label="Active Status"
                   />
                </Box>
             </Box>
             <Box mt="1.5rem" display="flex" gap={2}>
                <Button
                    type="submit"
                    variant="contained"
                    className="save-button"
                    disabled={loading}
                >
                   {loading ? "Saving..." : "Save"}
                </Button>
                <Button variant="contained" onClick={() => navigate("/users")} className="cancel-button">
                   Cancel
                </Button>
             </Box>
          </form>
       </Box>
   );
}

export default CreateUser;