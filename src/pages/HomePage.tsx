import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PORT = import.meta.env.VITE_PORT;

const HomePage = () => {
  const [difficulty, setDifficulty] = useState("medium");
  const [topic, setTopic] = useState("general");
  const [isStarted, setIsStarted] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
   const navigate = useNavigate();


  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const response = await fetch(`http://localhost:${PORT}/api/quizzes`);
    const data = await response.json();
    setQuizzes(data);
  };

  const generateQuiz = async () => {
    const response = await fetch(`http://localhost:${PORT}/api/quiz/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, difficulty }),
    });
    const quiz = await response.json();
    setIsStarted(true);
    fetchQuizzes();
  };

  


   const handleQuizSelect = (quizId: string) => {
     navigate(`/quiz/${quizId}`);
   };


  return (
    <div className="container mx-auto p-4 max-w-2xl flex flex-col space-y-4">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Quiz Generator
        </h1>
      </div>

      {/* Quick Start */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md p-6">
        <button
          className="w-full px-4 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 font-bold text-lg"
          // onClick={() => setIsStarted(true)}
          onClick={() => handleQuizSelect("default")}
        >
          Start Default Quiz
        </button>
      </div>

      {/* Quiz Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Custom Quiz Settings
        </h2>

        <div className="space-y-2">
          <label className="block text-gray-700 dark:text-gray-300">
            Difficulty
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 dark:text-gray-300">
            Topic
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          >
            <option value="general">General Knowledge</option>
            <option value="science">Science</option>
            <option value="history">History</option>
            <option value="geography">Geography</option>
            <option value="tech">Technology</option>
          </select>
        </div>

        <button
          className="w-full px-4 py-3 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600"
          onClick={generateQuiz}
        >
          Start Custom Quiz
        </button>
      </div>

      {/* Generated Quizzes List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Generated Quizzes
        </h2>
        <div className="space-y-3">
          {quizzes.map((quiz: any, index: number) => (
            <div
              key={index}
              onClick={() => handleQuizSelect(quiz.id)}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {quiz.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {quiz.category}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Generated:{" "}
                  {new Date(quiz.dateGenerated * 1000).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {quiz.length} questions
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
