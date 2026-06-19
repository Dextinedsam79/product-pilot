import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Generation Route
  app.post("/api/generate", async (req, res) => {
    try {
      const { idea, artifactType } = req.body;
      
      if (!idea || !artifactType) {
        return res.status(400).json({ error: "Idea and artifactType are required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is missing" });
      }

      const ai = new GoogleGenAI({ apiKey });

      let prompt = "";
      if (artifactType === "brd") {
        prompt = `You are an expert Business Analyst. Generate a professional Business Requirements Document (BRD) based on the following business idea. Use markdown formatting.\n\nIdea: ${idea}`;
      } else if (artifactType === "prd") {
        prompt = `You are an expert Product Manager. Generate a professional Product Requirements Document (PRD) based on the following business idea. Use markdown formatting.\n\nIdea: ${idea}`;
      } else if (artifactType === "user-stories") {
        prompt = `You are an expert Agile Product Owner. Generate comprehensive User Stories for the following product idea. Follow the standard "As a [type of user], I want [some goal] so that [some reason]" format. Use markdown formatting.\n\nIdea: ${idea}`;
      } else if (artifactType === "acceptance-criteria") {
        prompt = `You are an expert QA Analyst and Product Owner. Generate acceptance criteria for the core features of the following product idea using Given/When/Then format. Use markdown formatting.\n\nIdea: ${idea}`;
      } else if (artifactType === "test-cases") {
        prompt = `You are an expert Quality Assurance Engineer. Generate a suite of test cases (both positive and negative) for the following product idea. Include Test Case ID, Description, Pre-conditions, Steps, and Expected Results. Use markdown formatting.\n\nIdea: ${idea}`;
      } else {
        return res.status(400).json({ error: "Invalid artifact type" });
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      res.json({ content: response.text });
    } catch (error: any) {
      console.error("AI Generation Error:", error);
      
      const errorMessage = error.message || "";
      if (errorMessage.includes("503") || errorMessage.includes("high demand") || error.status === 503) {
        return res.status(503).json({ error: "The AI model is currently experiencing high demand. Please try again in a few moments." });
      }
      
      res.status(500).json({ error: errorMessage || "Failed to generate artifact" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
