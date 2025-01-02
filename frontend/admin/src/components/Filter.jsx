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

   // Подгрузка атрибутов
   useEffect(() => {
      const fetchAttributes = async () => {
         try {
            const response = await axios.get(
                `http://localhost:5001/attributes?entityType=${entityType}`
            );
            setAttributes(response.data);
         } catch (error) {
            console.error("Error fetching attributes:", error);
         }
      };
      fetchAttributes();
   }, [entityType]);

   // Открытие и закрытие попапа
   const handleOpen = () => setIsOpen(true);
   const handleClose = () => setIsOpen(false);

   // Обработка изменения чекбоксов
   const handleAttributeToggle = (attributeCode) => {
      setSelectedAttributes((prevSelected) => {
         const updatedSelected = prevSelected.includes(attributeCode)
             ? prevSelected.filter((code) => code !== attributeCode)
             : [...prevSelected, attributeCode];

         // Удаляем значение из filterValues, если фильтр снят
         if (!updatedSelected.includes(attributeCode)) {
            setFilterValues((prevValues) => {
               const { [attributeCode]: _, ...rest } = prevValues;
               return rest;
            });
         }

         return updatedSelected;
      });
   };

   // Обработка изменения значений фильтров
   const handleFilterChange = (attributeCode, value) => {
      setFilterValues((prevValues) => ({
         ...prevValues,
         [attributeCode]: value,
      }));
      setIsResetEnabled(true);
   };

   // Очистка всех фильтров
   const handleReset = () => {
      const resetValues = {};
      selectedAttributes.forEach((attr) => {
         resetValues[attr] = "";
      });
      setFilterValues(resetValues);
      setIsResetEnabled(false);
   };

   // Применение фильтров в блоке фильтров
   const handleApplyFilters = () => {
      onApplyFilters(filterValues); // Применение фильтров
   };

   // Закрытие попапа без применения фильтров
   const handlePopupApply = () => {
      handleClose(); // Просто закрываем попап
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

          {/* Кнопки Apply и Reset */}
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
                     disabled={Object.keys(filterValues).length === 0}
                 >
                    Apply
                 </Button>
              </Box>
          )}

          {/* Диалоговое окно */}
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