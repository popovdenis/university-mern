import React from "react";
import {Sidebar as MySidebar, Menu, MenuItem} from "react-pro-sidebar";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {tokens} from "../../../theme";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import {useState} from "react";
import {Link} from "react-router-dom";

const Item = ({title, to, icon, selected, setSelected}) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   return (
       <MenuItem
           active={selected === title}
           style={{
              color: colors.grey[100],
           }}
           onClick={() => setSelected(title)}
           icon={icon}
           component={<Link to={to}/>} // Используем Link только здесь
       >
          <Typography>{title}</Typography>
       </MenuItem>
   );
};

function Sidebar() {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
   const [isCollapsed, setCollapsed] = useState(false);
   const [selected, setSelected] = useState("dashboard");

   return (
       <div className="sidebar">
          <Box
              sx={{
                 "& .pro-sidebar": {
                    backgroundColor: "black !important",
                 },
                 "& .pro-sidebar-inner": {
                    backgroundColor: `${colors.primary[400]} !important`,
                 },
                 "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                 },
                 "& .pro-inner-item": {
                    // padding: "5px 35px 5px 20px !important",
                 },
                 "& .pro-inner-item:hover": {
                    // color: `${colors.grey[700]} !important`,
                 },
                 "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                 },
                 "& .ps-menuitem-root:hover": {
                    color: "yellow !important",
                 },
              }}
          >
             <MySidebar
                 collapsed={isCollapsed}
                 backgroundColor={colors.primary[400]}
                 height="100vh"
             >
                <Menu
                    iconShape="square"
                    menuItemStyles={{
                       button: {
                          [`&:hover`]: {
                             backgroundColor: colors.blueAccent[300],
                          },
                          [`&.active`]: {
                             backgroundColor: "#fff",
                             color: "#b6c8d9",
                          },
                       },
                    }}
                >
                   <MenuItem
                       onClick={() => setCollapsed(!isCollapsed)}
                       icon={isCollapsed ? <MenuOutlinedIcon/> : undefined}
                       style={{
                          margin: "10px 0px 20px 0px",
                          color: colors.grey[700],
                       }}
                   >
                      {!isCollapsed && (
                          <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              ml="15px"
                          >
                             <Typography variant="h3" color={colors.grey[100]}>
                                Admin Panel
                             </Typography>
                             <IconButton onClick={() => setCollapsed(!isCollapsed)}>
                                <MenuOutlinedIcon/>
                             </IconButton>
                          </Box>
                      )}
                   </MenuItem>
                   {!isCollapsed && (
                       <Box mb="25px">
                          <Box textAlign="center">
                             <Typography
                                 variant="h3"
                                 color={colors.grey[100]}
                                 fontWeight="bold"
                                 sx={{m: "10px 0 0 0"}}
                             >
                                Denis Popov
                             </Typography>
                             <Typography
                                 variant="h5"
                                 fontWeight="400"
                                 color={colors.greenAccent[500]}
                             >
                                Admin
                             </Typography>
                          </Box>
                       </Box>
                   )}
                   <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                      <Item
                          title="Dashboard"
                          to="/"
                          selected={selected}
                          setSelected={setSelected}
                      />
                      <Typography variant="h6" color={colors.grey[300]} sx={{m: "15px 0px 5px 20px"}}>
                         Customers
                      </Typography>
                      <Item
                          title="All Customers"
                          to="/contact"
                          icon={<PersonOutlinedIcon/>}
                          selected={selected}
                          setSelected={setSelected}
                      />
                      <Item
                          title="Invoices Balances"
                          to="/invoices"
                          icon={<ReceiptOutlinedIcon/>}
                          selected={selected}
                          setSelected={setSelected}
                      />
                      <Typography variant="h6" color={colors.grey[300]} sx={{m: "15px 0px 5px 20px"}}>
                         Graphs
                      </Typography>
                      <Item
                          title="Bar Chart"
                          to="/bar"
                          icon={<BarChartOutlinedIcon/>}
                          selected={selected}
                          setSelected={setSelected}
                      />
                      <Item
                          title="Pie Chart"
                          to="/pie"
                          icon={<PieChartOutlineOutlinedIcon/>}
                          selected={selected}
                          setSelected={setSelected}
                      />
                      <Item
                          title="Line Chart"
                          to="/line"
                          icon={<TimelineOutlinedIcon/>}
                          selected={selected}
                          setSelected={setSelected}
                      />
                      <Typography variant="h6" color={colors.grey[300]} sx={{m: "15px 0px 5px 20px"}}>
                         System
                      </Typography>
                      <Item
                          title="All Users"
                          to="/users"
                          icon={<PeopleOutlinedIcon/>}
                          selected={selected}
                          setSelected={setSelected}
                      />
                   </Box>
                </Menu>
             </MySidebar>
          </Box>
       </div>
   );
}

export default Sidebar;
