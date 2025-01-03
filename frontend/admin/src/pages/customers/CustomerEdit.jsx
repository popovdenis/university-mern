import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import SidebarTab from "../../components/SidebarTab";
import TabContent from "./tabs/TabContent";

const CustomerEdit = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const [activeTab, setActiveTab] = useState("account");
   const [tabData] = useState({});
   const [loading] = useState(false);

   const tabs = [
      { id: "account", label: "Account Information" },
      { id: "courses", label: "Courses" },
   ];

   return (
       <Box m="1.5rem">
          <Typography variant="h4" color={colors.grey[100]} gutterBottom>
             Edit User
          </Typography>
          <Box display="flex">
             <SidebarTab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
             <Box width="80%" p={3}>
                {loading ? "Loading..." : <TabContent activeTab={activeTab} data={tabData[activeTab]} />}
             </Box>
          </Box>
       </Box>
   );
};

export default CustomerEdit;