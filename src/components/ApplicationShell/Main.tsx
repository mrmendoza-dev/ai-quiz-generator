import { Route, Routes, useLocation } from "react-router-dom";

import HomePage from "@pages/HomePage";
import Quiz from "@components/Quiz";

function Main() {

  return (
    <main className="Main w-full h-full flex flex-col overflow-auto p-2">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/:id" element={<Quiz />} />
      </Routes>
    </main>
  );
}

export default Main;
