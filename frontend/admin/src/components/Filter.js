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
              variant="contained"
              className="filter-button"
              onClick={handleOpen}
          >
             Filters
          </Button>

          <Modal open={open} onClose={handleClose}>
             <Box
                 sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "8px",
                 }}
             >
                <Typography variant="h6" mb={2}>
                   Select Filters
                </Typography>
                <List>
                   {attributes.map((attr) => (
                       <ListItem key={attr.attributeCode} disablePadding>
                          <FormControlLabel
                              control={
                                 <Checkbox
                                     checked={selectedAttributes.includes(attr.attributeCode)}
                                     onChange={() =>
                                         handleCheckboxChange(attr.attributeCode)
                                     }
                                 />
                              }
                              label={attr.label}
                          />
                       </ListItem>
                   ))}
                </List>
                <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
                   <Button onClick={handleClose}>Cancel</Button>
                   <Button
                       variant="contained"
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