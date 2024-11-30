import express from "express";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import {
  generateUnixTimestamp,
  ensureDirectoryExists,
} from "../utils/index.js";
import { fetchGPTResponse } from "../services/index.js";


const router = express.Router();

// Basic health check
router.get("/", (req, res) => {
  res.json({ status: "Server running" });

  console.log("Server running");
});

router.get("/quizzes", async (req, res) => {
  try {
    const generatedDir = path.join(process.cwd(), "data", "generated");
    const files = await fs.readdir(generatedDir);
    const quizzes = [];

    for (const file of files) {
      if (file.endsWith(".json")) {
        const content = await fs.readFile(
          path.join(generatedDir, file),
          "utf-8"
        );
        const quiz = JSON.parse(content);
        quizzes.push({
          id: quiz.id,
          dateGenerated: quiz.dateGenerated,
          name: quiz.name,
          category: quiz.category,
          difficulty: quiz.difficulty,
          length: quiz.questions.length,
        });
      }
    }

    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/quiz/:id", async (req, res) => {
  try {
    const generatedDir = path.join(process.cwd(), "data", "generated");
    const files = await fs.readdir(generatedDir);
    const filename = files.find((file) => file.startsWith(req.params.id));

    if (!filename) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    const content = await fs.readFile(
      path.join(generatedDir, filename),
      "utf-8"
    );
    res.json(JSON.parse(content));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/quiz/generate", async (req, res) => {
  const { topic, numQuestions, difficulty } = req.body;

  // Validate required fields
  if (!topic || !numQuestions || !difficulty) {
    return res.status(400).json({
      error: "Missing required fields",
      required: {
        topic: !topic ? "missing" : "ok",
        numQuestions: !numQuestions ? "missing" : "ok",
        difficulty: !difficulty ? "missing" : "ok",
      },
    });
  }

  // Validate field types
  if (
    typeof topic !== "string" ||
    typeof numQuestions !== "number" ||
    typeof difficulty !== "string"
  ) {
    return res.status(400).json({
      error: "Invalid field types",
      required: {
        topic: "string",
        numQuestions: "number",
        difficulty: "string",
      },
    });
  }

  // Additional validations
  if (numQuestions < 1 || numQuestions > 20) {
    return res.status(400).json({
      error: "Number of questions must be between 1 and 20",
    });
  }

  if (!["easy", "medium", "hard", "mixed"].includes(difficulty.toLowerCase())) {
    return res.status(400).json({
      error: "Invalid difficulty. Must be 'easy', 'medium', 'hard', or 'mixed'",
    });
  }

  try {
    const systemInstruction = `You are a quiz generator. You are given a topic, a number of questions, and a difficulty. 
  You need to generate a quiz with the given topic, number of questions, and difficulty.
  
1. Answer-First Approach:
- First, identify the key concept or fact you want to test
- Determine the correct answer before writing the question
- Design the question to specifically target this answer
- Create plausible distractors based on common misconceptions about this answer

2. Question Design:
- Write clear, unambiguous questions
- Focus on one specific concept per question
- Use positive phrasing (avoid "which is NOT")
- Include real-world applications when possible and relevant
- Ensure questions are appropriate for the specified difficulty level

3. Answer Choices:
- Provide exactly 4 options per question, unless otherwise specified
- Make all options plausible and similar in length
- Use common misconceptions as distractors
- Avoid "all/none of the above" options
- Keep options mutually exclusive and grammatically parallel
- Order options logically (e.g., numerical order, chronological)

4. Difficulty Levels:
- Easy: Basic recall, definitions, straightforward concepts
- Medium: Understanding, application, simple analysis
- Hard: Complex analysis, evaluation, synthesis of multiple concepts
- Mixed: Balanced combination of all levels

5. Educational Value:
- Reference specific principles or concepts in explanations
- Explain why wrong answers are incorrect
- Add relevant examples or context when helpful

  Respond in JSON format like {
    "name": "Name of the quiz",
    "category": "Category of the quiz",
    "questions": [
      {
        "category": "Category of the question",
        "difficulty": "Difficulty of the question: easy, medium, hard",
        "question": "Question",
        "choices": ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
        "answer": "Answer",
        "explanation": "Explanation of the answer"
      }
    ]
  }.`;
    const userInstruction = `Topic: ${topic}, Number of Questions: ${numQuestions}, Difficulty: ${difficulty}`;

    const gptResponse = await fetchGPTResponse(
      systemInstruction,
      userInstruction
    );

    // Validate GPT response
    if (!gptResponse || typeof gptResponse !== "object") {
      throw new Error("Invalid response from GPT");
    }

    // Validate required GPT response fields
    const requiredFields = ["name", "category", "questions"];
    const missingFields = requiredFields.filter((field) => !gptResponse[field]);

    if (missingFields.length > 0) {
      throw new Error(
        `Missing required fields in GPT response: ${missingFields.join(", ")}`
      );
    }

    // Validate questions array
    if (
      !Array.isArray(gptResponse.questions) ||
      gptResponse.questions.length === 0
    ) {
      throw new Error("Questions must be a non-empty array");
    }

    // Validate each question
    gptResponse.questions.forEach((question, index) => {
      const requiredQuestionFields = [
        "category",
        "difficulty",
        "question",
        "choices",
        "answer",
        "explanation",
      ];
      const missingQuestionFields = requiredQuestionFields.filter(
        (field) => !question[field]
      );

      if (missingQuestionFields.length > 0) {
        throw new Error(
          `Question ${
            index + 1
          } is missing fields: ${missingQuestionFields.join(", ")}`
        );
      }

      if (!Array.isArray(question.choices) || question.choices.length !== 4) {
        throw new Error(`Question ${index + 1} must have exactly 4 choices`);
      }
    });

    // Create quiz object
    const quizId = uuidv4();
    const quiz = {
      id: quizId,
      dateGenerated: generateUnixTimestamp(),
      name: gptResponse.name,
      category: gptResponse.category,
      difficulty,
      questions: gptResponse.questions,
    };

    // Create directories and write file
    const dataDir = path.join(process.cwd(), "data");
    const generatedDir = path.join(dataDir, "generated");

    await ensureDirectoryExists(dataDir);
    await ensureDirectoryExists(generatedDir);

    await fs.writeFile(
      path.join(generatedDir, `${quizId}.json`),
      JSON.stringify(quiz, null, 2)
    );

    res.json(quiz);
  } catch (error) {
    console.error("Quiz generation error:", error);
    res.status(500).json({
      error: "Error generating quiz",
      details: error.message,
    });
  }
});

export default router;
