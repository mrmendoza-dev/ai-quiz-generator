import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import routes from './routes/index.js'


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes)



const PORT = process.env.VITE_PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running → http://localhost:${PORT}`)
);
