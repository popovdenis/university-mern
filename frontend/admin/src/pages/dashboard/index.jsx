import React from "react";
import {Box, Button, IconButton, Typography, useTheme} from "@mui/material";
import {
   DownloadOutlined,
   Email,
   PointOfSale,
   PersonAdd,
   Traffic
} from "@mui/icons-material";

import { mockTransactions } from "../../data/mockData";
import Header from "../../components/Header";
import ProgressCircle from "../../components/ProgressCircle";
import StatBox from "../../components/StatBox";
import LineChart from "../../components/LineChart";
import SubscribersPerCourseBarChart from "../../components/charts/SubscribersPerCourseBarChart";
import CourseStatusPieChart from "../../components/charts/CourseStatusPieChart";
import { tokens } from "../../theme";

function Dashboard() {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   return (
       <Box margin="0.5rem 1rem 5rem">
          <Box display="flex" justifyContent="space-between" alignItems="center">
             <Header title="DASHBOARD" subtitle="Welcome to your dashboard"/>
             <Box>
                <Button
                    sx={{
                       backgroundColor: colors.blueAccent[400],
                       color: colors.grey[100],
                       fontSize: "1rem",
                       fontWeight: "bold",
                       padding: "0.1remem 0.2rem",
                    }}
                >
                   <DownloadOutlined sx={{mr: "0.2rem"}}/>
                   Download Reports
                </Button>
             </Box>
          </Box>

          {/* Progress bars */}
          <Box
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gap="1rem !important"
              gridAutoRows="minmax(100px, auto)"
          >
             {/* first Row */}
             <Box
                 gridColumn="span 3"
                 backgroundColor={colors.primary[400]}
                 display="flex"
                 alignItems="center"
                 justifyContent="center"
             >
                <StatBox
                    title="12,361"
                    subtitle="Emails Sent"
                    progress="0.75"
                    increase="+14%"
                    icon={
                       <Email
                           sx={{color: colors.greenAccent[600], fontSize: "26px"}}
                       />
                    }
                />
             </Box>

             <Box
                 gridColumn="span 3"
                 backgroundColor={colors.primary[400]}
                 display="flex"
                 alignItems="center"
                 justifyContent="center"
             >
                <StatBox
                    title="431,225"
                    subtitle="Sales Obtained"
                    progress="0.50"
                    increase="+21%"
                    icon={
                       <PointOfSale sx={{color: colors.greenAccent[600], fontSize: "26px"}} />
                    }
                />
             </Box>

             <Box
                 gridColumn="span 3"
                 backgroundColor={colors.primary[400]}
                 display="flex"
                 alignItems="center"
                 justifyContent="center"
             >
                <StatBox
                    title="32,441"
                    subtitle="New Clients"
                    progress="0.30"
                    increase="+5%"
                    icon={
                       <PersonAdd sx={{color: colors.greenAccent[600], fontSize: "26px"}} />
                    }
                />
             </Box>

             <Box
                 gridColumn="span 3"
                 backgroundColor={colors.primary[400]}
                 display="flex"
                 alignItems="center"
                 justifyContent="center"
             >
                <StatBox
                    title="1,325,134"
                    subtitle="Traffic Received"
                    progress="0.80"
                    increase="+43%"
                    icon={
                       <Traffic sx={{color: colors.greenAccent[600], fontSize: "26px"}} />
                    }
                />
             </Box>

             {/* second row */}
             <Box
                 gridColumn="span 8"
                 gridRow="span 2"
                 backgroundColor={colors.primary[400]}
                 height="50vh !important"
             >
                <Box
                    mt="25px"
                    p="0 30px"
                    display="flex "
                    justifyContent="space-between"
                    alignItems="center"
                >
                   <Box>
                      <Typography
                          variant="h5"
                          fontWeight="600"
                          color={colors.grey[100]}
                      >
                         Revenue Generated
                      </Typography>
                      <Typography
                          variant="h3"
                          fontWeight="bold"
                          color={colors.greenAccent[500]}
                      >
                         $59,342.32
                      </Typography>
                   </Box>
                   <Box>
                      <IconButton>
                         <DownloadOutlined sx={{fontSize: "26px", color: colors.greenAccent[500]}} />
                      </IconButton>
                   </Box>
                </Box>
                <Box height="250px !important" m="-20px 0 0 0">
                   <LineChart isDashboard={true}/>
                </Box>
             </Box>

             {/* transactions */}
             <Box
                 gridColumn="span 4"
                 gridRow="span 2"
                 backgroundColor={colors.primary[400]}
                 height="50vh !important"
                 overflow="auto !important"
                 className="transaction-container"
             >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    colors={colors.grey[100]}
                    p="15px"
                >
                   <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                      Recent Transactions
                   </Typography>
                </Box>

                {mockTransactions.map((transaction, i) => (
                    <Box
                        key={`${transaction.txId}-${i}`}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        p="15px"
                    >
                       <Box>
                          <Typography
                              color={colors.greenAccent[500]}
                              variant="h5"
                              fontWeight="600"
                          >
                             {transaction.txId}
                          </Typography>
                          <Typography color={colors.grey[100]}>
                             {transaction.user}
                          </Typography>
                       </Box>
                       <Box color={colors.grey[100]}>{transaction.date}</Box>
                       <Box
                           backgroundColor={colors.greenAccent[500]}
                           p="5px 10px"
                           borderRadius="4px"
                       >
                          ${transaction.cost}
                       </Box>
                    </Box>
                ))}
             </Box>


             <Box
                 gridColumn="span 4"
                 gridRow="span 2"
                 backgroundColor={colors.primary[400]}
             >
                <Typography
                    variant="h5"
                    fontWeight="600"
                    sx={{padding: "30px 30px 0 30px"}}
                >
                   Course Status
                </Typography>
                <Box height="250px" mt="-20px">
                   <CourseStatusPieChart />
                </Box>
             </Box>

             <Box
                 gridColumn="span 4"
                 gridRow="span 2"
                 backgroundColor={colors.primary[400]}
             >
                <Typography
                    variant="h5"
                    fontWeight="600"
                    sx={{padding: "30px 30px 0 30px"}}
                >
                   Subscriber Levels
                </Typography>
                <Box height="250px" mt="-20px">
                   <SubscribersPerCourseBarChart />
                </Box>
             </Box>

          </Box>
       </Box>
   );
}

export default Dashboard;
