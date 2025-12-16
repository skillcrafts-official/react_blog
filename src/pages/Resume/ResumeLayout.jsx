import { Outlet, useLocation } from "react-router-dom";
// import Header from "@/features/sidebar/Header";
// import { useResumeState } from "@/lib/providers/ResumeProvider";
// import { useEffect, useState } from "react";

function ResumeLayout() {
  // const location = useLocation();
  
  return (
    // <div id="header"className="flex flex-row min-h-screen min-w-[680px] max-w-[1000px] bg-[#181818ff]">
    // <div id="header" className="flex flex-row min-h-screen w-full bg-[#181818ff]">
    //     <div className="flex flex-col gap-7 w-full">
    //         <header className='sticky'>
    //             <Header/>
    //         </header>
            <main className="main mb-7">
              <Outlet className="w-full"/>
            </main>
            
    //     </div>
    // </div>
  );
}

export default ResumeLayout;
