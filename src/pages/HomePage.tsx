import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PORT = import.meta.env.VITE_PORT;

const HomePage = () => {
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


      <QuizGeneratorForm fetchQuizzes={fetchQuizzes} />


      <QuizList quizzes={quizzes} handleQuizSelect={handleQuizSelect} />
    </div>
  );
};

export default HomePage;







function QuizGeneratorForm({ fetchQuizzes }: { fetchQuizzes: () => void }) {

  const [topicDescription, setTopicDescription] = useState("");
  const [details, setDetails] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("medium");


    const generateQuiz = async () => {
      const response = await fetch(
        `http://localhost:${PORT}/api/quiz/generate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: topicDescription,
            details,
            numQuestions,
            difficulty,
          }),
        }
      );
      const quiz = await response.json();
      fetchQuizzes();
    };
  



return (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md p-6 space-y-4">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
      Custom Quiz Settings
    </h2>

    {/* Grid layout for two textareas */}
    <div className="grid grid-cols-1 gap-4 mb-4">
      <div className="space-y-2">
        <label className="block text-gray-700 dark:text-gray-300">
          Topic Description
        </label>
        <textarea
          value={topicDescription}
          onChange={(e) => setTopicDescription(e.target.value)}
          className="w-full p-2 h-32 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          placeholder="Describe the quiz topic..."
        />
      </div>
    </div>

    {/* Controls row */}
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="space-y-2">
        <label className="block text-gray-700 dark:text-gray-300">
          Number of Questions
        </label>
        <input
          type="number"
          min="1"
          max="20"
          value={numQuestions}
          onChange={(e) => setNumQuestions(parseInt(e.target.value))}
          className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
        />
      </div>
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
    </div>

    <button
      className="w-full px-4 py-3 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600"
      onClick={generateQuiz}
    >
      Generate Quiz
    </button>
  </div>
);



}








function QuizList({ quizzes, handleQuizSelect }: { quizzes: any[], handleQuizSelect: (quizId: string) => void }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md p-6">
      <button
        className="w-full mb-4 px-4 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 font-bold text-lg"
        // onClick={() => setIsStarted(true)}
        onClick={() => handleQuizSelect("default")}
      >
        Start Default Quiz
      </button>

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
  );
}


