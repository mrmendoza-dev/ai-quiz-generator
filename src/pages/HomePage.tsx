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
          AI Quiz Generator
        </h1>
      </div>


      <QuizGeneratorForm fetchQuizzes={fetchQuizzes} />


      <QuizList quizzes={quizzes} handleQuizSelect={handleQuizSelect} />
    </div>
  );
};

export default HomePage;







function QuizGeneratorForm({ fetchQuizzes }: { fetchQuizzes: () => void }) {

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    topicDescription: "",
    numQuestions: 5,
    difficulty: "mixed",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "numQuestions" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    generateQuiz();
  };

  const generateQuiz = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:${PORT}/api/quiz/generate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: formData.topicDescription,
            numQuestions: formData.numQuestions,
            difficulty: formData.difficulty,
          }),
        }
      );
      const quiz = await response.json();
      fetchQuizzes();
    } catch (error) {
      console.error("Error generating quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };


return (
  <form
    onSubmit={handleSubmit}
    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md p-6 space-y-4"
  >
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
      Custom Quiz Settings
    </h2>

    <div className="space-y-2">
      <label
        htmlFor="topicDescription"
        className="block text-gray-700 dark:text-gray-300"
      >
        Topic Description
      </label>
      <textarea
        id="topicDescription"
        name="topicDescription"
        value={formData.topicDescription}
        onChange={handleChange}
        className="w-full p-2 h-32 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
        placeholder="Describe the quiz topic..."
        required
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label
          htmlFor="numQuestions"
          className="block text-gray-700 dark:text-gray-300"
        >
          Number of Questions
        </label>
        <input
          id="numQuestions"
          name="numQuestions"
          type="number"
          min="1"
          max="20"
          value={formData.numQuestions}
          onChange={handleChange}
          className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          required
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="difficulty"
          className="block text-gray-700 dark:text-gray-300"
        >
          Difficulty
        </label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
          required
        >
          <option value="mixed">Mixed</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>

    <button
      type="submit"
      disabled={isLoading}
      className={`w-full px-4 py-3 rounded-lg text-white relative font-bold
          ${
            isLoading
              ? "bg-indigo-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          }`}
    >
      {isLoading ? (
        <>
          <span className="opacity-0">Generate Quiz</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </>
      ) : (
        "Generate Quiz"
      )}
    </button>
  </form>
);



}








function QuizList({ quizzes, handleQuizSelect }: { quizzes: any, handleQuizSelect: (quizId: string) => void }) {
  const sortedQuizzes = [...quizzes].sort(
    (a, b) => b.dateGenerated - a.dateGenerated
  );

  const getDifficultyColor = (difficulty: string) => {
    const colors: any = {
      easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      mixed:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    };
    return colors[difficulty?.toLowerCase()] || colors.mixed;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md p-6">
      <button
        className="w-full mb-4 px-4 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 text-base font-bold"
        onClick={() => handleQuizSelect("default")}
      >
        Start Default Quiz
      </button>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Generated Quizzes
      </h2>

      {sortedQuizzes.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No quizzes generated yet. Create your first quiz above!
        </div>
      ) : (
        <div className="space-y-3">
          {sortedQuizzes.map((quiz, index) => (
            <div
              key={index}
              onClick={() => handleQuizSelect(quiz.id)}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {quiz.name}
                </h3>
                <span className="text-gray-600 dark:text-gray-400">
                  {quiz.category}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {new Date(quiz.dateGenerated * 1000).toLocaleString()}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
                      quiz.difficulty
                    )}`}
                  >
                    {quiz.difficulty || "mixed"}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-500">
                  {quiz.length} questions
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

