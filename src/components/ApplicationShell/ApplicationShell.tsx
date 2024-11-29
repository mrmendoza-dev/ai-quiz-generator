import React from "react";
import Main from "@/components/ApplicationShell/Main";
import Nav from "@/components/ApplicationShell/Nav";
import Sidebar from "@/components/ApplicationShell/Sidebar";


function ApplicationShell() {
  return (
    <div className="ApplicationShell antialiased flex flex-col w-screen h-screen bg-gray-50 dark:bg-gray-900 text-white">
      <Nav />
      <div className="flex flex-1 h-full overflow-hidden">
        {/* <Sidebar /> */}
        <Main />
      </div>
    </div>
  );
}

export default ApplicationShell;
