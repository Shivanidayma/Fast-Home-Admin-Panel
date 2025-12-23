import React from "react";
import OrderStatistics from "./OrderStatistics";
import OrdePlaced from "./OrdePlaced";
import OrderRequest from "./OrderRequest";
import AssignDriver from "./AssignDriver";
function DashboardItem() {
 
  return (
    <div
      id="content"
      className="relative w-full h-screen overflow-y-auto pt-2 bg-[#F1F4FA]"
    >     
    <OrderStatistics/>
      <div className="flex flex-wrap mt-6 mx-2 lg:mx-0">
        <div className="w-full lg:w-2/3 pr-0 lg:pr-2 ">
         <OrdePlaced/>
        </div>
        <div className="w-full lg:w-1/3 pl-0 lg:pl-2 mt-6 lg:mt-0">
          <div className="p-8 bg-white rounded-lg justify-center items-center h-full">
           <OrderRequest/>
           <AssignDriver/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardItem;
