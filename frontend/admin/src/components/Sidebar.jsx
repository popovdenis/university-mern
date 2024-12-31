import React, { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, Typography, IconButton, useTheme, Tooltip } from "@mui/material";
import { tokens } from "../theme";
import {
   PeopleTwoTone,
   PeopleOutlined,
   BarChartOutlined,
   PieChartOutlineOutlined,
   TimelineOutlined,
   MenuOutlined,
   AddCircleOutline,
   AdminPanelSettings,
   AdminPanelSettingsOutlined,
} from "@mui/icons-material";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';

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
       <Box>
          <ProSidebar
              collapsed={isCollapsed}
              style={{
                 backgroundColor: colors.sidebar.bg,
                 color: colors.sidebar.text,
              }}
          >
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

                <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                   <SidebarItem
                       title="Dashboard"
                       to="/"
                       icon={<TimelineOutlined />}
                       selected={selected}
                       setSelected={setSelected}
                       isCollapsed={isCollapsed}
                   />

                   {/* Categories */}
                   <Typography variant="h6" color={colors.grey[300]} sx={{ margin: "15px 0 5px 20px" }}>
                      Customers
                   </Typography>
                   <SubMenu
                       label={!isCollapsed && "Categories"}
                       title="Categories"
                       icon={<ChecklistRtlIcon />}
                       style={{ color: colors.grey[100] }}
                   >
                      <SidebarItem
                          title="Categories"
                          to="/categories"
                          selected={selected}
                          setSelected={setSelected}
                          isCollapsed={isCollapsed}
                      />
                   </SubMenu>

                   {/* Customers */}
                   <Typography variant="h6" color={colors.grey[300]} sx={{ margin: "15px 0 5px 20px" }}>
                      Customers
                   </Typography>
                   <SubMenu
                       label={!isCollapsed && "Customers"}
                       title="Customers"
                       icon={<PeopleTwoTone />}
                       style={{ color: colors.grey[100] }}
                   >
                      <SidebarItem
                          title="All Customers"
                          to="/customers"
                          icon={<PeopleOutlined />}
                          selected={selected}
                          setSelected={setSelected}
                          isCollapsed={isCollapsed}
                      />
                      <SidebarItem
                          title="New Customer"
                          to="/customers/create"
                          icon={<AddCircleOutline />}
                          selected={selected}
                          setSelected={setSelected}
                          isCollapsed={isCollapsed}
                      />
                   </SubMenu>

                   {/* Courses */}
                   <Typography variant="h6" color={colors.grey[300]} sx={{ margin: "15px 0 5px 20px" }}>
                      Courses
                   </Typography>
                   <SubMenu
                       label={!isCollapsed && "Courses"}
                       title="Courses"
                       icon={<LibraryBooksIcon />}
                       style={{ color: colors.grey[100] }}
                   >
                      <SidebarItem
                          title="All Courses"
                          to="/courses"
                          icon={<CollectionsBookmarkIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          isCollapsed={isCollapsed}
                      />
                      <SidebarItem
                          title="New Course"
                          to="/courses/create"
                          icon={<BookmarkAddIcon />}
                          selected={selected}
                          setSelected={setSelected}
                          isCollapsed={isCollapsed}
                      />
                   </SubMenu>

                   {/* Graphs */}
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

                   {/* System */}
                   <Typography variant="h6" color={colors.grey[300]} sx={{ margin: "15px 0 5px 20px" }}>
                      System
                   </Typography>

                   {/* Users */}
                   <SubMenu
                       label={!isCollapsed && "Users"}
                       title="Users"
                       icon={<AdminPanelSettings />}
                       style={{
                          color: colors.grey[100],
                       }}
                   >
                      <SidebarItem
                          title="All Users"
                          to="/users"
                          icon={<AdminPanelSettingsOutlined />}
                          selected={selected}
                          setSelected={setSelected}
                          isCollapsed={isCollapsed}
                      />
                      <SidebarItem
                          title="New User"
                          to="/users/create"
                          icon={<AddCircleOutline />}
                          selected={selected}
                          setSelected={setSelected}
                          isCollapsed={isCollapsed}
                      />
                   </SubMenu>
                </Box>
             </Menu>
          </ProSidebar>
       </Box>
   );
};

export default Sidebar;