import { Request, Response, Router } from 'express';
import multer from 'multer';
const pdfParse = require('pdf-parse');
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// Configure multer for memory storage (we'll process the PDF Buffer directly)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'));
    }
  }
});

// The main analysis endpoint. Requires authentication and handles a single 'resume' file upload.
router.post('/', requireAuth, upload.single('resume'), async (req: Request, res: Response): Promise<any> => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No resume file uploaded.' });
    }

    // 1. Extract text from the PDF buffer
    const pdfData = await pdfParse(file.buffer);
    const resumeText = pdfData.text;

    if (!resumeText || resumeText.trim() === '') {
       return res.status(400).json({ error: 'Failed to extract text from the provided PDF.' });
    }

    // 2. Here is where we will call Gemini API with the extracted text
    // For now, we mock the AI response
    const mockAiResponse = {
      ats_score: 85,
      feedback: {
        strengths: ["Strong technical background", "Good use of action verbs"],
        weaknesses: ["Missing measurable achievements", "Formatting could be cleaner"],
        suggestions: ["Add metrics to your recent role", "Include a professional summary"]
      }
    };

    // 3. Here is where we will save the analysis to Supabase
    // const { data, error } = await supabase.from('analyses').insert({ ... })

    res.json({
      message: 'Analysis successful',
      data: mockAiResponse,
      // We also return the raw parsed text for debugging/confirmation
      extractedText: resumeText.substring(0, 200) + '...' 
    });

  } catch (error: any) {
    console.error('Error analyzing resume:', error);
    if (error.message === 'Only PDF files are allowed!') {
       return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'An error occurred during resume analysis.' });
  }
});

export default router;
