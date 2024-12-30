import React, {useEffect, useState} from "react";
import {Box, useTheme, Typography, Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import {tokens} from "../../theme";
import {AdminPanelSettingsOutlined} from "@mui/icons-material";
import {LockOpenOutlined} from "@mui/icons-material";
import Header from "../../components/Header";
import axios from "axios";

function Users() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [rowCount, setRowCount] = useState(0);

    const fetchData = async (page, pageSize) => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5001/admin-users", {
                params: {
                    _page: page + 1,
                    _limit: pageSize,
                }
            });
            setData(response.data);
            setRowCount(parseInt(response.headers["x-total-count"]));
        } catch (error) {
            console.log('Error while fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(paginationModel.page, paginationModel.pageSize);
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
            render: ({ row }) => {
                return (
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
                )
            }
        },
        {
            field: "actions",
            headerName: "Actions",
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
    ];

    return (
        <Box m="0.5rem 1rem">
            <Header title="Users"/>
            <Box
                margin="0.5rem 1rem"
                m="2rem 0 0 0"
                height="63.5vh"
            >
                <DataGrid
                    rows={data}
                    columns={columns}
                    loading={loading}
                    paginationMode="server"
                    paginationModel={paginationModel}
                    onPaginationModelChange={handlePaginationChange}
                    rowCount={rowCount}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    pagination
                />
            </Box>
        </Box>
    );
}

export default Users;
