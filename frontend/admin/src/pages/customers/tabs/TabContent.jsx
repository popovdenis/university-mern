import React from "react";
import { Typography } from "@mui/material";
import AccountInformation from "./AccountInformation";
import CustomerCourses from "./CustomerCourses";

const TabContent = ({ activeTab, data }) => {
    switch (activeTab) {
        case "account":
            return <AccountInformation data={data} />;
        case "courses":
            return <CustomerCourses data={data} />;
        case "modules":
            // return <Modules data={data} />;
        case "orders":
        case "students":
            // return <Students data={data} />;
        default:
            return <Typography>No data available</Typography>;
    }
};

export default TabContent;