import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, FormControlLabel, Switch, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

function EditCategory() {
   const { id } = useParams(); // Получаем ID категории из URL
   const navigate = useNavigate();
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const [categories, setCategories] = useState([]); // Для списка категорий
   const [formData, setFormData] = useState({
      title: "",
      description: "",
      parentId: "",
      position: 0,
      isActive: true,
   });
   const [errors, setErrors] = useState({});
   const [loading, setLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");

   // Загрузка данных категории и списка категорий
   useEffect(() => {
      const fetchCategoryAndParents = async () => {
         try {
            // Получение текущей категории
            const categoryResponse = await axios.get(`http://localhost:5001/categories/${id}`);
            const categoryData = categoryResponse.data;

            // Установка данных категории в форму
            setFormData({
               title: categoryData.title || "",
               description: categoryData.description || "",
               parentId: categoryData.parentId || "",
               position: categoryData.position || 0,
               isActive: categoryData.isActive !== undefined ? categoryData.isActive : true,
            });

            // Загрузка всех доступных категорий
            const categoriesResponse = await axios.get("http://localhost:5001/categories");
            setCategories(categoriesResponse.data);
         } catch (error) {
            console.error("Error fetching category or categories:", error);
         }
      };

      fetchCategoryAndParents();
   }, [id]);

   const handleChange = (event) => {
      const { name, value, type, checked } = event.target;
      setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
   };

   const validate = () => {
      const newErrors = {};
      if (!formData.title.trim()) {
         newErrors.title = "Title is required";
      }

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      if (!validate()) return;

      setLoading(true);
      try {
         await axios.put(`http://localhost:5001/categories/${id}`, {
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
          <Typography variant="h4" color={colors.grey[100]} gutterBottom>Edit Category</Typography>
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
                      <MenuItem value="">None (Root Category)</MenuItem>
                      {categories.filter((category) => category.id !== id).map((category) => (
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
                       type="number"
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

export default EditCategory;