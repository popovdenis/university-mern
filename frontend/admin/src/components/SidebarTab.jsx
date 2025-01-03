import React from "react";
import '../assets/styles/tabs.css'

const SidebarTab = ({ tabs, activeTab, onTabChange }) => {
   return (
       <div className="container">
          <div className="tabs-container">
             {tabs.map((tab) => (
                 <div
                     key={tab.id}
                     className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                     onClick={() => onTabChange(tab.id)}
                 >
                    {tab.label}
                 </div>
             ))}
         </div>
       </div>
   );
};

export default SidebarTab;