import React, { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, IconButton, useTheme, Tooltip } from "@mui/material";
import { tokens } from "../../../theme";
import {
   PeopleOutlined,
   ReceiptOutlined,
   PersonOutlined,
   BarChartOutlined,
   PieChartOutlineOutlined,
   TimelineOutlined,
   MenuOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const SidebarItem = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   return (
       <Tooltip title={isCollapsed ? title : ""} placement="right">
          <MenuItem
              active={selected === title}
              style={{
                 color: colors.grey[100],
              }}
              onClick={() => setSelected(title)}
              icon={icon}
              component={<Link to={to} />}
          >
             {!isCollapsed && <Typography>{title}</Typography>}
          </MenuItem>
       </Tooltip>
   );
};

const Sidebar = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [isCollapsed, setCollapsed] = useState(false);
   const [selected, setSelected] = useState("Dashboard");

   return (
       <Box
           sx={{
              "& .pro-sidebar": {
                 backgroundColor: colors.primary[400], // Обновленный фон
              },
              "& .pro-menu-item": {
                 color: colors.grey[100], // Темный текст для светлой темы
              },
              "& .pro-menu-item.active": {
                 color: colors.blueAccent[500], // Активный элемент
                 backgroundColor: colors.primary[200], // Мягкий фон для активного
              },
              "& .pro-menu-item:hover": {
                 color: colors.primary[900], // Контрастный текст при наведении
              },
           }}
       >
          <ProSidebar collapsed={isCollapsed}>
             <Menu>
                {/* Toggle Button */}
                <MenuItem
                    onClick={() => setCollapsed(!isCollapsed)}
                    icon={isCollapsed ? <MenuOutlined /> : undefined}
                    style={{
                       margin: "10px 0 20px 0",
                       color: colors.grey[300],
                    }}
                >
                   {!isCollapsed && (
                       <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                          <Typography variant="h4" color={colors.grey[100]}>
                             Admin Panel
                          </Typography>
                          <IconButton onClick={() => setCollapsed(!isCollapsed)}>
                             <MenuOutlined />
                          </IconButton>
                       </Box>
                   )}
                </MenuItem>

                {/* User Info */}
                {!isCollapsed && (
                    <Box mb="25px" textAlign="center">
                       <Typography variant="h5" color={colors.grey[100]} fontWeight="bold">
                          Denis Popov
                       </Typography>
                       <Typography
                           variant="h5"
                           fontWeight="500"
                           color={colors.greenAccent[700]}
                       >
                          Admin
                       </Typography>
                    </Box>
                )}

                {/* Menu Items */}
                <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                   <SidebarItem
                       title="Dashboard"
                       to="/"
                       icon={<TimelineOutlined />}
                       selected={selected}
                       setSelected={setSelected}
                       isCollapsed={isCollapsed}
                   />
                   <Typography variant="h6" color={colors.grey[300]} sx={{ margin: "15px 0 5px 20px" }}>
                      Customers
                   </Typography>
                   <SidebarItem
                       title="All Customers"
                       to="/contact"
                       icon={<PersonOutlined />}
                       selected={selected}
                       setSelected={setSelected}
                       isCollapsed={isCollapsed}
                   />
                   <SidebarItem
                       title="Invoices"
                       to="/invoices"
                       icon={<ReceiptOutlined />}
                       selected={selected}
                       setSelected={setSelected}
                       isCollapsed={isCollapsed}
                   />
                   <Typography variant="h6" color={colors.grey[300]} sx={{ margin: "15px 0 5px 20px" }}>
                      Graphs
                   </Typography>
                   <SidebarItem
                       title="Bar Chart"
                       to="/bar"
                       icon={<BarChartOutlined />}
                       selected={selected}
                       setSelected={setSelected}
                       isCollapsed={isCollapsed}
                   />
                   <SidebarItem
                       title="Pie Chart"
                       to="/pie"
                       icon={<PieChartOutlineOutlined />}
                       selected={selected}
                       setSelected={setSelected}
                       isCollapsed={isCollapsed}
                   />
                   <SidebarItem
                       title="Line Chart"
                       to="/line"
                       icon={<TimelineOutlined />}
                       selected={selected}
                       setSelected={setSelected}
                       isCollapsed={isCollapsed}
                   />
                   <Typography variant="h6" color={colors.grey[300]} sx={{ margin: "15px 0 5px 20px" }}>
                      System
                   </Typography>
                   <SidebarItem
                       title="All Users"
                       to="/users"
                       icon={<PeopleOutlined />}
                       selected={selected}
                       setSelected={setSelected}
                       isCollapsed={isCollapsed}
                   />
                </Box>
             </Menu>
          </ProSidebar>
       </Box>
   );
};

export default Sidebar;