import React, { useEffect, useState } from "react";
import { Box, useTheme, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import { LockOpenOutlined } from "@mui/icons-material";
import Header from "../../components/Header";
import ConfirmationDialog from "../../components/ConfirmationDeleteDialog";
import axios from "axios";

function Users() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const [entities, setEntities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [rowCount, setRowCount] = useState(0);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState(null);

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
            await axios.delete(`http://localhost:5001/admin-users/${selectedEntity.id}`);
            setEntities(entities.filter((entity) => entity.id !== selectedEntity.id));
        } catch (error) {
            console.error(error);
        } finally {
            handleCloseDialog();
        }
    };

    const fetchEntities = async (page, pageSize) => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5001/admin-users", {
                params: {
                    _page: page + 1,
                    _limit: pageSize,
                },
            });
            setEntities(response.data);
            setRowCount(parseInt(response.headers["x-total-count"]));
        } catch (error) {
            console.log("Error while fetching entities:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntities(paginationModel.page, paginationModel.pageSize);
    }, [paginationModel]);

    const handlePaginationChange = (model) => {
        setPaginationModel(model);
    };

    const columns = [
        {
            field: "id",
            headerName: "ID",
        },
        {
            field: "firstname",
            headerName: "Firstname",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "lastname",
            headerName: "Lastname",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "isActive",
            headerName: "Status",
            flex: 1,
            render: ({ row }) => (
                <Box
                    width="60%"
                    m="0 auth"
                    p="0.2rem"
                    display="flex"
                    justifyContent="center"
                    backgroundColor={
                        row.isActive ? colors.greenAccent[600] : colors.grey[600]
                    }
                    borderRadius="5px"
                >
                    {row.isActive ? <LockOpenOutlined /> : <AdminPanelSettingsOutlined />}
                    <Typography color={colors.grey[100]} sx={{ ml: "0.2rem" }}>
                        {row.isActive ? "Active" : "Inactive"}
                    </Typography>
                </Box>
            ),
        },
        {
            field: "edit",
            headerName: "Edit",
            flex: 0.5,
            renderCell: ({ row }) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/users/edit/${row.id}`)}
                >
                    Edit
                </Button>
            ),
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
            <Header title="Users" />
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button
                    variant="contained"
                    className="save-button"
                    onClick={() => navigate("/users/create")}
                >
                    Create User
                </Button>
            </Box>
            <Box
                margin="0.5rem 1rem"
                m="2rem 0 0 0"
                height={entities.length > 0 ? `${entities.length * 75}px ${64 * 16}px` : '300px'}
                minHeight="300px"
                maxHeight="64vh"
            >
                <DataGrid
                    rows={entities}
                    columns={columns}
                    loading={loading}
                    paginationMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={handlePaginationChange}
                    rowCount={rowCount}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    pagination
                />
                <ConfirmationDialog
                    open={openDialog}
                    title="Delete User"
                    contentText={`Are you sure you want to delete user ${selectedEntity?.firstname} ${selectedEntity?.lastname}?`}
                    onClose={handleCloseDialog}
                    onConfirm={handleConfirmDelete}
                    confirmText="Delete"
                    cancelText="Cancel"
                />
            </Box>
        </Box>
    );
}

export default Users;