import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Sidebar = () => {
    const [usersOpen, setUsersOpen] = React.useState(false);
    const [coursesOpen, setCoursesOpen] = React.useState(false);
    const [reportsOpen, setReportsOpen] = React.useState(false);

    const toggleUsers = () => setUsersOpen(!usersOpen);
    const toggleCourses = () => setCoursesOpen(!coursesOpen);
    const toggleReports = () => setReportsOpen(!reportsOpen);

    return (
        <Box sx={{ width: 250 }}>
            <List component="nav">
                {/* Dashboard */}
                <ListItemButton component="a" href="/dashboard">
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                {/* Users */}
                <ListItemButton onClick={toggleUsers}>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                    {usersOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={usersOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }} component="a" href="/admin-users">
                            <ListItemText primary="Admin Users" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} component="a" href="/customers">
                            <ListItemText primary="Customers" />
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* Courses */}
                <ListItemButton onClick={toggleCourses}>
                    <ListItemIcon>
                        <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary="Courses" />
                    {coursesOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={coursesOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }} component="a" href="/courses">
                            <ListItemText primary="All Courses" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} component="a" href="/course-categories">
                            <ListItemText primary="Course Categories" />
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* Reports */}
                <ListItemButton onClick={toggleReports}>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                    {reportsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={reportsOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }} component="a" href="/reports/enrollments">
                            <ListItemText primary="Enrollments Report" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} component="a" href="/reports/financials">
                            <ListItemText primary="Financial Report" />
                        </ListItemButton>
                    </List>
                </Collapse>

                {/* Settings */}
                <ListItemButton component="a" href="/settings">
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItemButton>
            </List>
        </Box>
    );
};

export default Sidebar;