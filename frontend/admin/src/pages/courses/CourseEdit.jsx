import React, { useState, useEffect } from "react";
import {
   Box,
   MenuItem,
   Button,
   TextField,
   Switch,
   FormControlLabel,
   Typography,
   FormControl,
   InputLabel,
   Select
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CourseEdit = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [attributes, setAttributes] = useState([]);
   const [course, setCourse] = useState({
      title: '',
      description: '',
      duration: '',
      level:  '',
      isActive: true,
   });

   const [errors, setErrors] = useState({});
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const fetchCourse = async () => {
         try {
            const response = await axios.get(`http://localhost:5001/courses/${id}`);
            setCourse({
               ...response.data
            });
            if (response.data.attributes && response.data.attributes.length) {
               setAttributes(response.data.attributes);
            }
         } catch (error) {
            console.error("Error fetching course data:", error);
         }
      };

      fetchCourse();
   }, [id]);

   const handleChange = (event) => {
      const { name, value, type, checked } = event.target;
      setCourse((prevCourse) => ({
         ...prevCourse,
         [name]: type === "checkbox" ? checked : value,
      }));
   };

   const validate = () => {
      const newErrors = {};
      if (!course.title.trim()) {
         newErrors.title = "Title is required";
      }
      if (!course.duration.trim()) {
         newErrors.duration = "Duration is required";
      }
      if (!course.level.trim()) {
         newErrors.level = "Duration is required";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      if (!validate()) return;

      setLoading(true);
      try {
         await axios.put(`http://localhost:5001/courses/${id}`, course);
         navigate("/courses");
      } catch (error) {
         console.error("Error updating course:", error);
      } finally {
         setLoading(false);
      }
   };

   return (
       <Box m="1.5rem">
          <Typography variant="h4" color={colors.grey[100]} gutterBottom>
             Edit Course
          </Typography>
          <form onSubmit={handleSubmit}>
             <Box display="grid" gap="1.5rem" gridTemplateColumns="1fr 1fr">
                <Box>
                   <TextField
                       fullWidth
                       label="Title *"
                       name="title"
                       value={course.title}
                       onChange={handleChange}
                       error={!!errors.title}
                       helperText={errors.title}
                   />
                </Box>
                <Box>
                   <TextField
                       fullWidth
                       label="Description *"
                       name="description"
                       value={course.description}
                       onChange={handleChange}
                       error={!!errors.description}
                       helperText={errors.description}
                   />
                </Box>
                <Box gridColumn="span 2">
                   <TextField
                       fullWidth
                       label="Description *"
                       name="description"
                       value={course.description}
                       onChange={handleChange}
                       error={!!errors.description}
                       helperText={errors.description}
                       margin="normal"
                       rows={4}
                   />
                </Box>
                <Box>
                   <FormControl fullWidth margin="normal">
                      <InputLabel id="duration-label">Duration</InputLabel>
                      <Select
                          labelId="duration-label"
                          name="duration"
                          value={course.duration}
                          onChange={handleChange}
                      >
                         {!loading &&
                             attributes.map((attribute) => {
                                if (attribute.attributeCode === 'duration') {
                                   return attribute.options.map((option, index) => (
                                       <MenuItem key={index} value={option}>{option}</MenuItem>
                                   ))
                                }
                             })
                         }
                      </Select>
                   </FormControl>
                </Box>
                <Box>
                   <FormControl fullWidth margin="normal">
                      <InputLabel id="level-label">Level</InputLabel>
                      <Select
                          labelId="level-label"
                          name="level"
                          value={course.level}
                          onChange={handleChange}
                      >
                         {!loading &&
                             attributes.map((attribute) => {
                                if (attribute.attributeCode === 'level') {
                                   return attribute.options.map((option, index) => (
                                       <MenuItem key={index} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</MenuItem>
                                   ))
                                }
                             })
                         }
                      </Select>
                   </FormControl>
                </Box>
                <Box gridColumn="span 2">
                   <FormControlLabel
                       control={
                          <Switch
                              name="isActive"
                              checked={course.isActive}
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
                <Button variant="contained" onClick={() => navigate("/courses")} className="cancel-button">
                   Cancel
                </Button>
             </Box>
          </form>
       </Box>
   );
};

export default CourseEdit;