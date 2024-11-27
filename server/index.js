import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs/promises";
import path from "path";
import { generateUnixTimestamp, ensureDirectoryExists } from "./utility.js";
import { v4 as uuidv4 } from "uuid";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Basic health check
app.get("/", (req, res) => {
  res.json({ status: "Server running" });

  console.log("Server running");
});



app.get("/api/quizzes", async (req, res) => {
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
          length: quiz.questions.length,
        });
      }
    }

    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/quiz/:id", async (req, res) => {
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


app.post("/api/quiz/generate", async (req, res) => {
  const { topic, difficulty } = req.body;
    const quizId = uuidv4();

  const quiz = {
    id: quizId,
    dateGenerated: generateUnixTimestamp(),
    name: "Test Quiz",
    category: "Test Category",
    questions: [
      {
        category: topic,
        difficulty,
        question: "Test Question?",
        choices: ["A", "B", "C", "D"],
        answer: "A",
        explanation: "Test Explanation",
      },
    ],
  };

  const filename = `${quizId}.json`;


      const dataDir = path.join(process.cwd(), "data");
      const generatedDir = path.join(dataDir, "generated");

      await ensureDirectoryExists(dataDir);
      await ensureDirectoryExists(generatedDir);


  await fs.writeFile(
    path.join(generatedDir, filename),

    JSON.stringify(quiz, null, 2)
  );

  res.json(quiz);
});


const PORT = process.env.VITE_PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running → http://localhost:${PORT}`)
);
