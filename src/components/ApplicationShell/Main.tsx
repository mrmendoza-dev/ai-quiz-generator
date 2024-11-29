import { Route, Routes, useLocation } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import QuizPage from "@/pages/QuizPage";

function Main() {

  return (
    <main className="Main w-full h-full flex flex-col overflow-auto p-2">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
      </Routes>
    </main>
  );
}

export default Main;
