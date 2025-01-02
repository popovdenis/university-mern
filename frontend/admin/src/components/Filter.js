import React from "react";
import { Box, Button } from "@mui/material";

const Filter = ({ entityType, onFilterClick }) => {
   return (
       <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
              variant="contained"
              className="filter-button"
              onClick={onFilterClick}
          >
             Filters
          </Button>
       </Box>
   );
};

export default Filter;