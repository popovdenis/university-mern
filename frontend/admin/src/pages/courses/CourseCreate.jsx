import React, {useEffect, useState} from "react";
import {
   Box,
   TextField,
   Button,
   Typography,
   FormControlLabel,
   Switch,
   MenuItem,
   FormControl,
   InputLabel, Select
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {tokens} from "../../theme";
import {useTheme} from "@mui/material/styles";
import ImageUploader from "../../components/ImageUploader";
import { Autocomplete } from "@mui/material";

function CreateCourse() {
   const navigate = useNavigate();
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [attributes, setAttributes] = useState([]);
   const [categories] = useState([]);

   const [course, setCourse] = useState({
      title: "",
      description: "",
      parentId: "",
      position: 0,
      isActive: true,
   });

   const [errors, setErrors] = useState({});
   const [loading, setLoading] = useState(false);
   const [imageExists, setImageExists] = useState(false);

   useEffect(() => {
      const fetchCourseAttributes = async () => {
         try {
            const response = await axios.get(`http://localhost:5001/attributes/course`);
            setAttributes(response.data.attributes);
         } catch (error) {
            console.error(error.message || 'Failed to fetch attributes data', 'error');
         } finally {
            setLoading(false);
         }
      };
      fetchCourseAttributes();
   }, []);

   const handleChange = (event) => {
      const { name, value, type, checked } = event.target;
      setCourse((prevCourse) => ({
         ...prevCourse,
         [name]: type === 'checkbox' ? checked : value,
      }));
   };
   const handleCategoriesChange = (event, value) => {
      setCourse((prevCourse) => ({
         ...prevCourse,
         categoryIds: value.map((category) => category.id),
      }));
   };
   const handleImageUpload = (filePath) => {
      setCourse((prev) => ({ ...prev, image: filePath }));
      setImageExists(true);
   };

   const validate = () => {
      const newErrors = {};
      if (!course.title.trim()) {
         newErrors.title = 'Title is required';
      }
      if (!course.duration.trim()) {
         newErrors.duration = 'Duration is required';
      }
      if (!course.level.trim()) {
         newErrors.level = 'Level is required';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      if (!validate()) return;

      setLoading(true);
      try {
         await axios.post(`http://localhost:5001/courses/`, {
            ...course,
            categories: course.categories?.map((cat) => cat.id) || [],
         });
         navigate('/courses');
      } catch (error) {
         console.error('Error while creating a course:', error);
      } finally {
         setLoading(false);
      }
   };

   return (
       <Box m="1.5rem">
          <Typography variant="h4" color={colors.grey[100]} gutterBottom>
             Create New Course
          </Typography>
          <form onSubmit={handleSubmit}>
             <Box display="grid" gap="1.5rem" gridTemplateColumns="1fr 1fr">
                <TextField
                    fullWidth
                    label="Title *"
                    name="title"
                    value={course.title}
                    onChange={handleChange}
                    error={!!errors.title}
                    helperText={errors.title}
                />
                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={course.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                />
                <Box gridColumn="span 2">
                   <Autocomplete
                       multiple
                       options={categories}
                       getOptionLabel={(option) => option.title}
                       value={categories.filter((cat) =>
                           course.categoryIds.includes(cat.id)
                       )}
                       onChange={handleCategoriesChange}
                       renderInput={(params) => (
                           <TextField
                               {...params}
                               label="Categories"
                               placeholder="Select categories"
                           />
                       )}
                   />
                </Box>
                <FormControl fullWidth margin="normal">
                   <InputLabel id="duration-label">Duration</InputLabel>
                   <Select
                       labelId="duration-label"
                       name="duration"
                       value={course.duration}
                       onChange={handleChange}
                   >
                      {attributes.map(
                          (attr) =>
                              attr.attributeCode === 'duration' &&
                              attr.options.map((opt, idx) => (
                                  <MenuItem key={idx} value={opt}>
                                     {opt}
                                  </MenuItem>
                              )),
                      )}
                   </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                   <InputLabel id="level-label">Level</InputLabel>
                   <Select
                       labelId="level-label"
                       name="level"
                       value={course.level}
                       onChange={handleChange}
                   >
                      {attributes.map(
                          (attr) =>
                              attr.attributeCode === 'level' &&
                              attr.options.map((opt, idx) => (
                                  <MenuItem key={idx} value={opt}>
                                     {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                  </MenuItem>
                              )),
                      )}
                   </Select>
                </FormControl>
                <FormControlLabel
                    control={
                       <Switch
                           name="isActive"
                           checked={course.isActive}
                           onChange={handleChange}
                       />
                    }
                    label="Active"
                />
                <Box>
                   {course.image && imageExists ? (
                       <Box>
                          <img
                              src={`http://localhost:5001${course.image}`}
                              alt="Uploaded Course"
                              style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                          />
                          <Typography mt={1} color="error">
                             * Note: To replace this image, upload a new one.
                          </Typography>
                       </Box>
                   ) : (
                       <Typography color="error">Image not found on server.</Typography>
                   )}
                </Box>
                <ImageUploader onUpload={handleImageUpload} />
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
                <Button variant="contained" onClick={() => navigate("/courses")} className="cancel-button">
                   Cancel
                </Button>
             </Box>
          </form>
       </Box>
   );
}

export default CreateCourse;