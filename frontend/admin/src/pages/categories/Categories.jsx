import React, { useEffect, useState, useCallback } from "react";
import { Box, useTheme, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import ConfirmationDialog from "../../components/ConfirmationDeleteDialog";
import axios from "axios";

function Categories() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [sortModel, setSortModel] = useState([
        { field: "id", sort: "asc" },
    ]);

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
            await axios.delete(`http://localhost:5001/categories/${selectedEntity.id}`);
            setCategories(categories.filter((entity) => entity.id !== selectedEntity.id));
        } catch (error) {
            console.error(error);
        } finally {
            handleCloseDialog();
        }
    };

    const fetchCategories = useCallback (async (page, pageSize) => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5001/categories", {
                params: {
                    _page: page + 1,
                    _limit: pageSize,
                    _sort: sortModel[0]?.field,
                    _order: sortModel[0].sort
                },
            });
            setCategories(response.data);
            setRowCount(parseInt(response.headers["x-total-count"]));
        } catch (error) {
            console.log("Error while fetching categories:", error);
        } finally {
            setLoading(false);
        }
    }, [sortModel]);

    useEffect(() => {
        fetchCategories(paginationModel.page, paginationModel.pageSize);
    }, [paginationModel, sortModel]);

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
                    onClick={() => navigate(`/categories/edit/${row.id}`)}
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
            <Header title="Categories" />
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button
                    variant="contained"
                    className="save-button"
                    onClick={() => navigate("/categories/create")}
                >
                    Add New Category
                </Button>
            </Box>
            <Box
                margin="0.5rem 1rem"
                m="2rem 0 0 0"
                height={categories.length > 0 ? `${categories.length * 75, 64 * 16}px` : '300px'}
                maxHeight="64vh"
            >
                <DataGrid
                    rows={categories}
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
                    title="Delete Category"
                    contentText={`Are you sure you want to delete category ${selectedEntity?.title}?`}
                    onClose={handleCloseDialog}
                    onConfirm={handleConfirmDelete}
                    confirmText="Delete"
                    cancelText="Cancel"
                />
            </Box>
        </Box>
    );
}

export default Categories;