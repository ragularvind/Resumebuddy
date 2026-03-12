import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Set up Multer for file uploads (store in memory for immediate processing)
const upload = multer({ storage: multer.memoryStorage() });

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ResumeBuddy API is running' });
});

// Placeholder for Flow 1 (Professional Analysis)
app.post('/api/analyze', upload.single('resume'), async (req, res) => {
  try {
    // We will extract PDF text and call Gemini API here
    const jobDescription = req.body.jobDescription;
    
    // Mock Response
    res.json({
      matchScore: 85,
      atsScore: 70,
      strengths: ["React", "Node.js"],
      missingSkills: ["Docker", "AWS"],
      tips: ["Quantify your impact on previous roles", "Add more keywords from JD"],
      interviewQuestions: ["Tell me about a time you optimized a React app.", "How do you handle state in large applications?"],
      roadmap: ["Learn Docker basics", "Build a small full-stack AWS project"]
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
});

// Placeholder for Flow 2 (Fresher Profile Builder)
app.post('/api/fresher', async (req, res) => {
  try {
    const { name, education, college, skills, projects, certifications, targetRole, jobDescription } = req.body;
    
    // Mock Response
    res.json({
      profileScore: 65,
      missingSkills: ["CI/CD", "System Design"],
      learningPlan: ["Week 1: CI/CD concepts", "Week 2: Basic system design patterns"],
      resumePreview: "A dynamically generated resume text based on input."
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate profile' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
