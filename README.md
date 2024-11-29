# AI Quiz Generator

A web application that generates customized quizzes using AI. Create quizzes on any topic with customizable difficulty levels and number of questions.

## Features
- Custom quiz generation with GPT
- Multiple difficulty levels (Easy, Medium, Hard, Mixed)
- Customizable number of questions
- Score tracking
- Detailed explanations for answers
- Dark/Light mode support
- Saves generated quizzes for later use

## Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/quiz-generator.git
cd quiz-generator
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
# Server port
VITE_PORT=3060

# OpenAI API credentials
VITE_OPENAI_ORGANIZATION="your_organization_id"
VITE_OPENAI_PROJECT="your_project_id"
VITE_OPENAI_API_KEY="your_api_key"
```

4. Create required directories:
```bash
mkdir -p data/generated
```

## Running the Application

Start both frontend and backend servers:
```bash
npm start
```

This will run:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3060`

## Development

Run frontend only:
```bash
npm run dev
```

Run backend only:
```bash
npm run server
```

## Project Structure
```
quiz-generator/
├── src/               # Frontend source code
├── server/            # Backend server code
├── data/
│   └── generated/    # Generated quiz files
└── public/           # Static assets
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| VITE_PORT | Backend server port | Yes |
| VITE_OPENAI_ORGANIZATION | OpenAI Organization ID | Yes |
| VITE_OPENAI_PROJECT | OpenAI Project ID | No |
| VITE_OPENAI_API_KEY | OpenAI API Key | Yes |

## Tech Stack
- React + Vite
- Express.js
- OpenAI API
- TailwindCSS
- Node.js

## License
MIT
