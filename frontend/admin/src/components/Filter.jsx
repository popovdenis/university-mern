import React, { useState, useEffect } from "react";
import {
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Checkbox,
   FormControlLabel,
   Typography,
   Select,
   MenuItem,
} from "@mui/material";
import axios from "axios";
import "../assets/styles/filter.css";

const Filters = ({ entityType, onApplyFilters }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [attributes, setAttributes] = useState([]);
   const [selectedAttributes, setSelectedAttributes] = useState([]);
   const [filterValues, setFilterValues] = useState({});
   const [isResetEnabled, setIsResetEnabled] = useState(false);

   useEffect(() => {
      const fetchAttributes = async () => {
         try {
            const response = await axios.get(`http://localhost:5001/attributes?entityType=${entityType}`);
            setAttributes(response.data);
         } catch (error) {
            console.error("Error fetching attributes:", error);
         }
      };
      fetchAttributes();
   }, [entityType]);

   // Open and close the popup
   const handleOpen = () => setIsOpen(true);
   const handleClose = () => setIsOpen(false);

   // Handle the checkboxes
   const handleAttributeToggle = (attributeCode) => {
      setSelectedAttributes((prevSelected) => {
         const updatedSelected = prevSelected.includes(attributeCode)
             ? prevSelected.filter((code) => code !== attributeCode)
             : [...prevSelected, attributeCode];

         // Delete the values from filterValues if a filter is deactivated
         if (!updatedSelected.includes(attributeCode)) {
            setFilterValues((prevValues) => {
               const { [attributeCode]: _, ...rest } = prevValues;
               return rest;
            });
         }

         return updatedSelected;
      });
   };

   // Handle the changes of filters
   const handleFilterChange = (attributeCode, value) => {
      const updatedFilterValues = {
         ...filterValues,
         [attributeCode]: value,
      };

      setFilterValues(updatedFilterValues);

      // If at least one filter has a value, then activate Reset
      const hasFilters = Object.values(updatedFilterValues).some((val) => val);
      setIsResetEnabled(hasFilters);
   };

   // Clear filters
   const handleReset = () => {
      const resetValues = {};
      selectedAttributes.forEach((attr) => {
         resetValues[attr] = "";
      });
      setFilterValues(resetValues);
      setIsResetEnabled(false);
   };

   // Apply filters in the block
   const handleApplyFilters = () => {
      const activeFilters = Object.entries(filterValues).reduce((acc, [key, value]) => {
         if (value) acc[key] = value;
         return acc;
      }, {});

      onApplyFilters(activeFilters);
   };

   // Close the popup
   const handlePopupApply = () => {
      handleClose();
   };

   return (
       <Box mb={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
             <Box className="filter-applied-area">
                {selectedAttributes.map((attr) => {
                   const attribute = attributes.find((a) => a.attributeCode === attr);
                   return (
                       <Box key={attr} className="filter-item">
                          <Typography>{attribute.label}</Typography>
                          <Select
                              className="filter-select"
                              value={filterValues[attr] || ""}
                              onChange={(e) => handleFilterChange(attr, e.target.value)}
                              displayEmpty
                          >
                             <MenuItem value="">
                                <em>Select</em>
                             </MenuItem>
                             {attribute.options.map((option) => (
                                 <MenuItem key={option} value={option}>
                                    {option}
                                 </MenuItem>
                             ))}
                          </Select>
                       </Box>
                   );
                })}
             </Box>
             <Button
                 className="filter-button"
                 variant="contained"
                 onClick={handleOpen}
             >
                Filters
             </Button>
          </Box>

          {selectedAttributes.length > 0 && (
              <Box display="flex" justifyContent="flex-end" mt={1}>
                 <Button
                     className="filter-reset-button"
                     onClick={handleReset}
                     disabled={!isResetEnabled}
                 >
                    Reset
                 </Button>
                 <Button
                     className="filter-apply-button"
                     onClick={handleApplyFilters}
                     disabled={selectedAttributes.length === 0 ||
                              Object.values(filterValues).every((value) => value === "")}
                 >
                    Apply
                 </Button>
              </Box>
          )}

          <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
             <DialogTitle>Select Filters</DialogTitle>
             <DialogContent>
                {attributes.map((attribute) => (
                    <FormControlLabel
                        key={attribute.attributeCode}
                        control={
                           <Checkbox
                               className="filter-checkbox"
                               checked={selectedAttributes.includes(attribute.attributeCode)}
                               onChange={() => handleAttributeToggle(attribute.attributeCode)}
                           />
                        }
                        label={attribute.label}
                        classes={{ label: "filter-checkbox-label" }}
                    />
                ))}
             </DialogContent>
             <DialogActions className="dialog-actions">
                <Button
                    className="filter-cancel-button"
                    onClick={handleClose}
                >
                   Cancel
                </Button>
                <Button
                    className="filter-apply-button"
                    onClick={handlePopupApply}
                    disabled={selectedAttributes.length === 0}
                >
                   Apply
                </Button>
             </DialogActions>
          </Dialog>
       </Box>
   );
};

export default Filters;