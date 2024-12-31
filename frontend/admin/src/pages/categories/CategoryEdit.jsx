import React, { useState } from "react";
import {Box, TextField, Button, Typography, FormControlLabel, Switch, MenuItem} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {tokens} from "../../theme";
import {useTheme} from "@mui/material/styles";
import categories from "../categories/Categories";

function CategoryEdit() {
   const navigate = useNavigate();
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [errors, setErrors] = useState({});
   const [loading, setLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");
   const [formData, setFormData] = useState({
      title: "",
      description: "",
      parentId: "",
      position: 0,
      isActive: true,
   });

   const handleChange = (event) => {
      const { name, value, type, checked } = event.target;
      setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value, }));
   };

   const validate = () => {
      const newErrors = {};
      if (!formData.title.trim()) {
         newErrors.firstname = "Title is required";
      }

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      if (!validate()) return;

      setLoading(true);
      try {
         await axios.post("http://localhost:5001/categories", {
            ...formData,
            parentId: formData.parentId || null,
         });
         navigate("/categories");
      } catch (error) {
         if (error.response && error.response.status === 400) {
            setErrorMessage(error.response.data.message);
         } else {
            console.error("Unexpected error:", error);
         }
      } finally {
         setLoading(false);
      }
   };

   return (
       <Box m="2rem">
          <Typography variant="h4" color={colors.grey[100]} gutterBottom>
             Create New Category
          </Typography>
          {errorMessage && (
              <Typography color="error" mb={2}>
                 {errorMessage}
              </Typography>
          )}
          <form onSubmit={handleSubmit}>
             <Box display="grid" gap="1.5rem" gridTemplateColumns="1fr 1fr">
                <Box>
                   <TextField
                       fullWidth
                       label="Title *"
                       name="title"
                       value={formData.title}
                       onChange={handleChange}
                       error={!!errors.title}
                       helperText={errors.title}
                   />
                </Box>
                <Box>
                   <TextField
                       label="Description"
                       name="description"
                       value={formData.description}
                       onChange={handleChange}
                       error={!!errors.description}
                       helperText={errors.description}
                       fullWidth
                       multiline
                       rows={4}
                   />
                </Box>
                <Box gridColumn="span 2">
                   <TextField
                       label="Parent Category"
                       name="parentId"
                       value={formData.parentId}
                       onChange={handleChange}
                       error={!!errors.parentId}
                       helperText={errors.parentId}
                       select
                       fullWidth
                   >
                      <MenuItem value="">Non (Root Category)</MenuItem>
                      {categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                             {category.title}
                          </MenuItem>
                      ))}
                   </TextField>
                </Box>
                <Box>
                   <TextField
                       label="Position"
                       name="position"
                       type="position"
                       value={formData.position}
                       onChange={handleChange}
                       error={!!errors.position}
                       helperText={errors.position}
                       fullWidth
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
                <Button variant="contained" onClick={() => navigate("/categories")} className="cancel-button">
                   Cancel
                </Button>
             </Box>
          </form>
       </Box>
   );
}

export default CategoryEdit;