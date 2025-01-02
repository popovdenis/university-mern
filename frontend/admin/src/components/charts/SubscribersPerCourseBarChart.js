import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";

const SubscribersPerCourseBarChart = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const [enrollments, setEnrollments] = useState([]);

   const fetchCourses = useCallback(async () => {
      try {
         const response = await axios.get("http://localhost:5001/reports/enrollments");

         const colorsSchema = {
            "expert": "hsl(25, 70%, 50%)",
            "beginner": "hsl(200, 70%, 50%)",
            "middle": "hsl(100, 70%, 50%)",
            "proficient": "hsl(300, 70%, 50%)",
         };
         const groupedData = response.data.map((entity) => ({
            level: entity.level.charAt(0).toUpperCase() + entity.level.slice(1),
            subscribers: entity.subscribers,
            color: colorsSchema[entity.level]
         }));
         setEnrollments(
             groupedData
         );
      } catch (error) {
         console.log("Error while fetching courses:", error);
      }
   }, []);

   useEffect(() => {
      fetchCourses();
   }, []);

   return (
       <ResponsiveBar
           data={enrollments}
           keys={['subscribers']}
           indexBy="level"
           margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
           padding={0.3}
           valueScale={{ type: "linear" }}
           indexScale={{ type: "band", round: true }}
           colors={({ data }) => data.color}
           defs={[
              {
                 id: "dots",
                 type: "patternDots",
                 background: "inherit",
                 color: "#38bcb2",
                 size: 4,
                 padding: 1,
                 stagger: true,
              },
              {
                 id: "lines",
                 type: "patternLines",
                 background: "inherit",
                 color: "#eed312",
                 rotation: -45,
                 lineWidth: 6,
                 spacing: 10,
              },
           ]}
           borderColor={{
              from: "color",
              modifiers: [["darker", "1.6"]],
           }}
           axisTop={null}
           axisRight={null}
           axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Course Levels",
              legendPosition: "middle",
              legendOffset: 32,
           }}
           axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Subscribers",
              legendPosition: "middle",
              legendOffset: -50,
           }}
           enableLabel={false}
           labelSkipWidth={12}
           labelSkipHeight={12}
           labelTextColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
           }}
           legends={[
              {
                 dataFrom: "indexes",
                 anchor: "bottom-right",
                 direction: "column",
                 justify: false,
                 translateX: 120,
                 translateY: 0,
                 itemsSpacing: 2,
                 itemWidth: 100,
                 itemHeight: 20,
                 itemDirection: "left-to-right",
                 itemOpacity: 1,
                 symbolSize: 20,
                 effects: [
                    {
                       on: "hover",
                       style: {
                          itemOpacity: 0.85,
                       },
                    },
                 ],
              },
           ]}
           theme={{
              axis: {
                 ticks: {
                    line: {
                       stroke: colors.grey[100],
                       strokeWidth: 1,
                    },
                    text: {
                       fill: colors.grey[100],
                    },
                 },
                 domain: {
                    line: {
                       stroke: colors.grey[100],
                    },
                 },
                 legend: {
                    text: {
                       fill: colors.grey[100],
                    },
                 },
              },
              legends: {
                 text: {
                    fill: colors.grey[100],
                 },
              },
              interactive: {
                 text: {
                    fill: colors.grey[100],
                 },
              },
              tooltip: {
                 container: {
                    background: colors.blueAccent[500],
                    fontSize: 12,
                 },
                 text: {
                    fill: colors.grey[100],
                 },
                 basic: {},
                 chip: {},
                 table: {},
                 tableCell: {},
                 tableCellValue: {},
              },
           }}
           role="application"
           barAriaLabel={function (e) {
              return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
           }}
       />
   )
};

export default SubscribersPerCourseBarChart;