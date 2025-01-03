import React from "react";
import { Typography } from "@mui/material";
import AccountInformation from "./AccountInformation";
// import Addresses from "./Addresses";
// import Orders from "./Orders";

const TabContent = ({ activeTab, data }) => {
    switch (activeTab) {
        case "account":
        case "details":
            return <AccountInformation data={data} />;
        case "addresses":
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