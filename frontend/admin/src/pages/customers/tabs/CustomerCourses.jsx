import {useNavigate, useParams} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import {tokens} from "../../../theme";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {Box, Typography} from "@mui/material";
import Header from "../../../components/Header";
import {DataGrid} from "@mui/x-data-grid";
import ConfirmationDialog from "../../../components/ConfirmationDeleteDialog";
import Filter from "../../../components/Filter";

const CustomerCourses = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const [paginationModel, setPaginationModel] = useState({
      page: 0,
      pageSize: 10,
   });
   const [courses, setCourses] = useState([]);
   const [loading, setLoading] = useState(false);
   const [rowCount, setRowCount] = useState(0);
   const [openDialog, setOpenDialog] = useState(false);
   const [selectedEntity, setSelectedEntity] = useState(null);
   const [sortModel, setSortModel] = useState([
      { field: "id", sort: "asc" },
   ]);
   const [entityType] = useState('course');
   const [selectedFilters, setSelectedFilters] = useState([]);
   const fetchGridData = useCallback (async (page, pageSize) => {
      setLoading(true);
      try {
         const response = await axios.get("http://localhost:5001/courses", {
            params: {
               _page: page + 1,
               _limit: pageSize,
               _sort: sortModel[0]?.field,
               _order: sortModel[0].sort,
               ...selectedFilters
            },
         });
         setCourses(response.data);
         setRowCount(parseInt(response.headers["x-total-count"]));
      } catch (error) {
         console.log("Error while fetching courses:", error);
      } finally {
         setLoading(false);
      }
   }, [sortModel, selectedFilters]);

   const handleFilterApply = (filters) => {
      setSelectedFilters(filters);
      setPaginationModel((prev) => ({ ...prev, page: 0 }));
   };
   const handleFilterReset = () => {
      setSelectedFilters({});
      setPaginationModel((prev) => ({ ...prev, page: 0 }));
   };

   useEffect(() => {
      fetchGridData(paginationModel.page, paginationModel.pageSize)
   }, [paginationModel, sortModel, selectedFilters]);

   const columns = [
      {
         field: "id",
         headerName: "ID",
      },
      {
         field: "title",
         headerName: "Title",
         flex: 1,
         cellClassName: "name-column--cell",
      },
      {
         field: "duration",
         headerName: "Duration",
         flex: 1,
      },
      {
         field: "level",
         headerName: "Level",
         flex: 1,
         cellClassName: "data-grid-cell-center",
         renderCell: ({ row }) => (
             <Box
                 width="60%"
                 m="10px 0"
                 p="0.2rem"
                 display="flex"
             >
                <Typography color={colors.grey[100]}>
                   {row.level?.charAt(0).toUpperCase() + row.level?.slice(1)}
                </Typography>
             </Box>
         )
      },
      {
         field: "isActive",
         headerName: "Status",
         flex: 1,
         cellClassName: "data-grid-cell-center",
         renderCell: ({ row }) => (
             <Box
                 width="60%"
                 m="10px 0"
                 p="0.2rem"
                 display="flex"
                 justifyContent="center"
                 backgroundColor={
                    row.isActive ? colors.greenAccent[600] : colors.grey[600]
                 }
                 borderRadius="5px"
             >
                <Typography color={colors.grey[100]}>
                   {row.isActive ? "Active" : "Inactive"}
                </Typography>
             </Box>
         )
      }
   ];

   return (
       <Box m="0.5rem 1rem">
          <Typography variant="h4" color={colors.grey[100]} mb={2} gutterBottom>
             Customer Courses
          </Typography>
          <Box m="1rem">
             <Filter entityType={entityType} onApplyFilters={handleFilterApply} onResetFilters={handleFilterReset} />
          </Box>
          <Box
              margin="0.5rem 1rem"
              m="2rem 0 0 0"
              height={courses.length > 0 ? `${courses.length * 75}px` : '300px'}
              maxHeight="64vh"
          >
             <DataGrid
                 rows={courses}
                 columns={columns}
                 loading={loading}
                 paginationMode="server"
                 paginationModel={paginationModel}
                 onPaginationModelChange={setPaginationModel}
                 sortModel={sortModel}
                 onSortModelChange={(model) => setSortModel(model)}
                 rowCount={rowCount}
                 rowsPerPageOptions={[10, 25, 50, 100]}
                 pagination
             />
          </Box>
       </Box>
   );
}

export default CustomerCourses;