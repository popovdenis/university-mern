import React, { useEffect, useState, useCallback } from "react";
import { Box, useTheme, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import axios from "axios";
import Header from "../../components/Header";
import ConfirmationDialog from "../../components/ConfirmationDeleteDialog";
import Filter from '../../components/Filter';

function Courses() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

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

    const handleFilterApply = (filters) => {
        setSelectedFilters(filters);
        setPaginationModel((prev) => ({ ...prev, page: 0 }));
    };

    const handleDeleteClick = (entity) => {
        setSelectedEntity(entity);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setSelectedEntity(null);
        setOpenDialog(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5001/courses/${selectedEntity.id}`);
            setCourses(courses.filter((entity) => entity.id !== selectedEntity.id));
        } catch (error) {
            console.error(error);
        } finally {
            handleCloseDialog();
        }
    };

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
        },
        {
            field: "edit",
            headerName: "Edit",
            flex: 0.5,
            renderCell: ({ row }) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/courses/edit/${row.id}`)}
                >
                    Edit
                </Button>
            )
        },
        {
            field: "delete",
            headerName: "Delete",
            flex: 0.5,
            renderCell: ({ row }) => (
                <Button
                    variant="contained"
                    className="cancel-button"
                    onClick={() => handleDeleteClick(row)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <Box m="0.5rem 1rem">
            <Header title="Courses" />
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button
                    variant="contained"
                    className="save-button"
                    onClick={() => navigate("/courses/create")}
                >
                    Add New Course
                </Button>
            </Box>
            <Box m="1rem">
                <Filter entityType={entityType} onApplyFilters={handleFilterApply} />
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
                <ConfirmationDialog
                    open={openDialog}
                    title="Delete Course"
                    contentText={`Are you sure you want to delete course ${selectedEntity?.title}?`}
                    onClose={handleCloseDialog}
                    onConfirm={handleConfirmDelete}
                    confirmText="Delete"
                    cancelText="Cancel"
                />
            </Box>
        </Box>
    );
}

export default Courses;