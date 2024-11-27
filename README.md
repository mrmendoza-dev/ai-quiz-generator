# Vite React Template
Template built for React projects with Vite loaded with popular libraries and tools.

## Resources
- [Favicon](https://favicon.io/)
- [TailwindCSS](https://tailwindcss.com/docs/installation)
- [Flowbite](https://flowbite.com/docs/getting-started/quickstart/)
- [Vite](https://vitejs.dev/guide/)
- [Favicon Creator](https://favicon.io/)
- [Supabase](https://supabase.com/docs)
- [Firebase](https://firebase.google.com/)
- [Netlify](https://docs.netlify.com/)

## TODO
- Add HTML meta tags, SEO tags
- Custom .gitigore
- Basic server.js





import { Configuration, OpenAIApi } from 'openai';
import { z } from 'zod'; // Runtime type checking

// Define strict types for question structure
const QuestionSchema = z.object({
  question: z.string(),
  correctAnswer: z.string(),
  explanation: z.string(),
  distractors: z.array(z.string()).length(3),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  topic: z.string(),
  subtopic: z.string().optional(),
});

type Question = z.infer<typeof QuestionSchema>;

export class QuizGenerator {
  private openai: OpenAIApi;
  
  constructor(apiKey: string) {
    this.openai = new OpenAIApi(new Configuration({ apiKey }));
  }

  async generateQuestions(topic: string, count: number): Promise<Question[]> {
    // First, generate key concepts and answers
    const conceptPrompt = `
      Topic: ${topic}
      Generate ${count} key concepts/facts that would make good quiz questions.
      For each concept, provide:
      1. The core fact/answer
      2. Difficulty level (easy/medium/hard)
      3. Related subtopic
      Format as JSON array.
    `;

    const concepts = await this.getCompletionAsJson(conceptPrompt);

    // Then generate full questions based on these concepts
    const questionsPrompt = concepts.map(concept => `
      Create a multiple choice question where "${concept.fact}" is the correct answer.
      Difficulty: ${concept.difficulty}
      Subtopic: ${concept.subtopic}
      
      Requirements:
      1. Question should test understanding, not just recall
      2. Distractors should be plausible but clearly incorrect
      3. Include a brief explanation of why the answer is correct
      
      Format as JSON with: question, correctAnswer, distractors (array of 3), explanation
    `);

    const questions = await Promise.all(
      questionsPrompt.map(prompt => this.getCompletionAsJson(prompt))
    );

    // Validate and format questions
    return questions.map((q, i) => ({
      ...q,
      topic,
      difficulty: concepts[i].difficulty,
      subtopic: concepts[i].subtopic,
    })).filter(q => {
      try {
        QuestionSchema.parse(q);
        return true;
      } catch (e) {
        console.error('Invalid question format:', e);
        return false;
      }
    });
  }

  private async getCompletionAsJson(prompt: string) {
    const completion = await this.openai.createChatCompletion({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are a subject matter expert creating educational content. Respond only with valid JSON."
      }, {
        role: "user",
        content: prompt
      }],
      temperature: 0.7,
    });

    return JSON.parse(completion.data.choices[0].message?.content || '[]');
  }
}

// Example usage
const generator = new QuizGenerator(process.env.OPENAI_API_KEY!);
const questions = await generator.generateQuestions('React Hooks', 5);