import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PORT = import.meta.env.VITE_PORT;

type Question = {
  category: string;
  question: string;
  choices: string[];
  answer: string;
  difficulty: "easy" | "medium" | "hard";
  explanation: string;
};

type QuizData = {
  dateGenerated: string;
  questions: Question[];
};

export default function QuizPage() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isRandom, setIsRandom] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();


  useEffect(() => {
    const fetchQuiz = async () => {
      let data;

      if (id && id !== "default") {
        const response = await fetch(`http://localhost:${PORT}/api/quiz/${id}`);
        data = await response.json();
      } else if (id === "default") {
        data = await import("@data/defaultQuestions.json");
      } else {
        console.log("No ID");
        navigate("/");
      }

      const questions = isRandom
        ? data.questions.sort(() => Math.random() - 0.5)
        : data.questions;

      setQuizData({
        dateGenerated: data.dateGenerated,
        questions: questions,
      });
    };

    fetchQuiz();
  }, [id, isRandom]);

  if (!quizData) return <div>Loading...</div>;

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

  const handleAnswer = (choice: string) => {
    setSelectedAnswer(choice);
    if (choice === currentQuestion.answer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);

    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setIsComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsComplete(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl flex flex-col space-y-4">
      {/* Stat Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Question {currentQuestionIndex + 1} of {quizData.questions.length}
          </h2>
          <div className="text-gray-900 dark:text-white">
            Score: {score}/{currentQuestionIndex + 1}
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md p-6">
        <div className="space-y-4">
          <p className="text-lg font-medium text-gray-900 dark:text-white">
            {currentQuestion.question}
          </p>
          <div className="grid gap-2">
            {currentQuestion.choices.map((choice, index) => (
              <button
                key={index}
                className={`w-full text-left px-4 py-3 rounded-lg ${
                  selectedAnswer === choice
                    ? choice === currentQuestion.answer
                      ? "bg-green-500 dark:bg-green-600 text-white"
                      : "bg-red-500 dark:bg-red-600 text-white"
                    : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                }`}
                onClick={() => handleAnswer(choice)}
                disabled={!!selectedAnswer}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation Card */}
      {showExplanation && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            {selectedAnswer === currentQuestion.answer
              ? "Correct!"
              : "Incorrect"}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {currentQuestion.explanation}
          </p>
          <button
            className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            onClick={nextQuestion}
          >
            {currentQuestionIndex + 1 === quizData.questions.length
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        </div>
      )}

      {/* Complete Card */}
      {isComplete && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            Quiz Complete!
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Final Score: {score}/{quizData.questions.length} (
            {Math.round((score / quizData.questions.length) * 100)}%)
          </p>
          <button
            className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
            onClick={restartQuiz}
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
