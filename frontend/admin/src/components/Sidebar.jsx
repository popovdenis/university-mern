import React, { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, Typography, IconButton, useTheme, Tooltip } from "@mui/material";
import { tokens } from "../theme";
import {
   PeopleTwoTone,
   PeopleOutlined,
   TimelineOutlined,
   MenuOutlined,
   AdminPanelSettings,
   AdminPanelSettingsOutlined,
   PersonAddAlt,
   Extension,
   Category,
   ListAlt,
   LibraryBooks
} from "@mui/icons-material";

import { Link } from "react-router-dom";

const SidebarItem = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   return (
       <Tooltip title={isCollapsed ? title : ""} placement="right">
          <>
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
          </>
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

                   {/* Catalog */}
                   <SubMenu
                       label={!isCollapsed && "Catalog"}
                       title="Catalog"
                       icon={<LibraryBooks />}
                       style={{ color: colors.grey[100] }}
                   >
                      <SidebarItem
                          title="Courses"
                          to="/courses"
                          icon={<ListAlt />}
                          selected={selected}
                          setSelected={setSelected}
                          isCollapsed={isCollapsed}
                      />
                      <SidebarItem
                          title="Categories"
                          to="/categories"
                          icon={<Category />}
                          selected={selected}
                          setSelected={setSelected}
                          isCollapsed={isCollapsed}
                      />
                   </SubMenu>

                   {/* Customers */}
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
                          icon={<PersonAddAlt />}
                          selected={selected}
                          setSelected={setSelected}
                          isCollapsed={isCollapsed}
                      />
                   </SubMenu>

                   {/* System */}
                   <SubMenu
                       label={!isCollapsed && "System"}
                       title="System"
                       icon={<AdminPanelSettings />}
                       style={{
                          color: colors.grey[100],
                       }}
                   >
                      <SidebarItem
                          title="Users"
                          to="/users"
                          icon={<AdminPanelSettingsOutlined />}
                          selected={selected}
                          setSelected={setSelected}
                          isCollapsed={isCollapsed}
                      />
                      <SidebarItem
                          title="Attributes"
                          to="/attributes"
                          icon={<Extension />}
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