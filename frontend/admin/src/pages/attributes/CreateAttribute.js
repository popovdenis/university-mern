import React, {useEffect, useState} from "react";
import {
   Box,
   TextField,
   Button,
   Typography,
   FormControlLabel,
   Switch,
   InputLabel,
   Select,
   MenuItem, FormControl
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {tokens} from "../../theme";
import {useTheme} from "@mui/material/styles";

function CreateAttribute() {
   const navigate = useNavigate();
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [errors, setErrors] = useState({});
   const [loading, setLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [entityTypes, setEntityTypes] = useState([]);
   const [entity, setEntity] = useState({
      attributeCode: '',
      label: '',
      options: '',
      entityType: '',
      isRequired: false,
   });

   useEffect(() => {
      const fetchEntityTypes = async () => {
         setLoading(true);
         try {
            const response = await axios.get("http://localhost:5001/entity-types");
            setEntityTypes(response.data);
         } catch (error) {
            console.log("Error while fetching entity types:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchEntityTypes();
   }, []);

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;

      if (name === "entityType") {
         setEntity((prev) => ({
            ...prev,
            entityType: value,
         }));
         return;
      }

      setEntity((prev) => ({
         ...prev,
         [name]: type === "checkbox" ? checked : value,
      }));
   }

   const validate = () => {
      const newErrors = {};
      if (!entity.attributeCode.trim()) {
         newErrors.firstname = "Attribute Code is required";
      }
      if (!entity.label.trim()) {
         newErrors.lastname = "Label is required";
      }

      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      if (!validate()) return;

      setLoading(true);
      try {
         await axios.post("http://localhost:5001/attributes", entity);
         navigate("/attributes");
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
             Create New Attribute
          </Typography>
          {errorMessage && (
              <Typography color="error" mb={2}>
                 {errorMessage}
              </Typography>
          )}
          <form onSubmit={handleSubmit}>
             <Box display="grid" gap="1.5rem" gridTemplateColumns="1fr 1fr">
                <TextField
                    fullWidth
                    label="Attribute Code *"
                    name="attributeCode"
                    value={entity.attributeCode}
                    onChange={handleChange}
                    error={!!errors.attributeCode}
                    helperText={errors.attributeCode}
                />
                <TextField
                    fullWidth
                    label="Label *"
                    name="label"
                    value={entity.label}
                    onChange={handleChange}
                    error={!!errors.label}
                    helperText={errors.label}
                />
                <TextField
                    fullWidth
                    label="Attribute Options (comma-separated)"
                    name="options"
                    value={entity.options}
                    onChange={handleChange}
                    multiline
                    rows={4}
                />
                <FormControl fullWidth margin="normal">
                   <InputLabel id="entity-type-label">Entity Type</InputLabel>
                   <Select
                       labelId="entity-type-label"
                       name="entityType"
                       value={entity.entityType || ""}
                       onChange={handleChange}
                   >
                      {entityTypes.map((entityType, index) => (
                          <MenuItem key={index} value={entityType._id}>{entityType.entityTypeCode}</MenuItem>
                      ))}
                   </Select>
                </FormControl>
                <FormControlLabel
                    control={
                       <Switch
                           name="isRequired"
                           checked={entity.isRequired}
                           onChange={handleChange}
                       />
                    }
                    label="Is Required"
                />
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
                <Button variant="contained" onClick={() => navigate("/attributes")} className="cancel-button">
                   Cancel
                </Button>
             </Box>
          </form>
       </Box>
   );
}

export default CreateAttribute;