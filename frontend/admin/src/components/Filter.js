import React, { useState, useEffect } from "react";
import {
   Box,
   Button,
   Modal,
   Typography,
   Checkbox,
   FormControlLabel,
   List,
   ListItem,
} from "@mui/material";
import axios from "axios";
import '../assets/styles/filter.css'

const Filter = ({ entityType, onFilterApply }) => {
   const [open, setOpen] = useState(false);
   const [attributes, setAttributes] = useState([]);
   const [selectedAttributes, setSelectedAttributes] = useState([]);

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const handleCheckboxChange = (attributeCode) => {
      setSelectedAttributes((prev) =>
          prev.includes(attributeCode)
              ? prev.filter((item) => item !== attributeCode)
              : [...prev, attributeCode]
      );
   };

   const handleApply = () => {
      onFilterApply(selectedAttributes);
      handleClose();
   };

   useEffect(() => {
      const fetchAttributes = async () => {
         try {
            const response = await axios.get(
                `http://localhost:5001/attributes/${entityType}`
            );
            setAttributes(response.data.attributes);
         } catch (error) {
            console.error("Error fetching attributes:", error);
         }
      };

      fetchAttributes();
   }, [entityType]);

   return (
       <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
              className="filter-button"
              onClick={handleOpen}
          >
             Filters
          </Button>

          <Modal open={open} onClose={handleClose}>
             <Box className="filter-modal">
                <Typography className="filter-modal-title">
                   Select Filters
                </Typography>
                <List className="filter-list">
                   {attributes.map((attr) => (
                       <ListItem key={attr.attributeCode} className="filter-list-item">
                          <FormControlLabel
                              control={
                                 <Checkbox
                                     checked={selectedAttributes.includes(attr.attributeCode)}
                                     onChange={() =>
                                         handleCheckboxChange(attr.attributeCode)
                                     }
                                     className="filter-checkbox"
                                 />
                              }
                              label={attr.label}
                          />
                       </ListItem>
                   ))}
                </List>
                <Box className="filter-modal-actions">
                   <Button
                       className="filter-cancel-button"
                       onClick={handleClose}
                   >
                      Cancel
                   </Button>
                   <Button
                       className="filter-apply-button"
                       onClick={handleApply}
                       disabled={selectedAttributes.length === 0}
                   >
                      Apply
                   </Button>
                </Box>
             </Box>
          </Modal>
       </Box>
   );
};

export default Filter;