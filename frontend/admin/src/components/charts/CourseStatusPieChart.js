import { useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../theme";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";

const CourseStatusPieChart = () => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   const [enrollments, setEnrollments] = useState([]);

   const fetchCourses = useCallback(async () => {
      try {
         const response = await axios.get("http://localhost:5001/reports/course-statuses");

         const colorsSchema = {
            "started": "#F1E15BFF",
            "stopped": "#F47560FF",
            "completed": "#E8C1A0FF",
         };
         setEnrollments(
             response.data.map((entity) => {
                const capitalizedStatus = entity.status.charAt(0).toUpperCase() + entity.status.slice(1);
                return {
                   id: capitalizedStatus,
                   label: capitalizedStatus,
                   value: entity.count,
                   color: colorsSchema[entity.status]
                };
             })
         );
      } catch (error) {
         console.log("Error while fetching courses:", error);
      }
   }, []);

   useEffect(() => {
      fetchCourses();
   }, []);

   return (
       <ResponsivePie
           theme={{
              // added
              axis: {
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
                 ticks: {
                    line: {
                       stroke: colors.grey[100],
                       strokeWidth: 1,
                    },
                    text: {
                       fill: colors.grey[100],
                    },
                 },
                 interactive: {
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
           data={enrollments}
           colors={({ data }) => data.color}
           margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
           startAngle={-22}
           innerRadius={0.5}
           cornerRadius={3}
           activeOuterRadiusOffset={8}
           borderWidth={1}
           borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
           }}
           arcLinkLabelsSkipAngle={10}
           arcLinkLabelsTextColor={colors.grey[100]}
           arcLinkLabelsThickness={2}
           arcLinkLabelsColor={{ from: "color" }}
           enableArcLabels={false}
           arcLabelsSkipAngle={10}
           arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
           }}
           defs={[
              {
                 id: "dots",
                 type: "patternDots",
                 background: "inherit",
                 color: "rgba(255, 255, 255, 0.3)",
                 size: 4,
                 padding: 1,
                 stagger: true,
              },
              {
                 id: "lines",
                 type: "patternLines",
                 background: "inherit",
                 color: "rgba(255, 255, 255, 0.3)",
                 rotation: -45,
                 lineWidth: 6,
                 spacing: 10,
              },
           ]}
           fill={[
              {
                 match: {
                    id: "ruby",
                 },
                 id: "dots",
              },
              {
                 match: {
                    id: "c",
                 },
                 id: "dots",
              },
              {
                 match: {
                    id: "go",
                 },
                 id: "dots",
              },
              {
                 match: {
                    id: "python",
                 },
                 id: "dots",
              },
              {
                 match: {
                    id: "scala",
                 },
                 id: "lines",
              },
              {
                 match: {
                    id: "lisp",
                 },
                 id: "lines",
              },
              {
                 match: {
                    id: "elixir",
                 },
                 id: "lines",
              },
              {
                 match: {
                    id: "javascript",
                 },
                 id: "lines",
              },
           ]}
           legends={[
              {
                 anchor: "bottom",
                 direction: "row",
                 justify: false,
                 translateX: 0,
                 translateY: 56,
                 itemsSpacing: 0,
                 itemWidth: 100,
                 itemHeight: 18,
                 itemTextColor: "#999",
                 itemDirection: "left-to-right",
                 itemOpacity: 1,
                 symbolSize: 18,
                 symbolShape: "circle",
                 effects: [
                    {
                       on: "hover",
                       style: {
                          itemTextColor: "#000",
                       },
                    },
                 ],
              },
           ]}
       />
   );
}

export default CourseStatusPieChart;