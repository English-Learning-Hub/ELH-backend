import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GrammarCheckDto } from './dto/grammar-check.dto';
import { GenerateExerciseDto } from './dto/generate-exercise.dto';
import {
  GrammarCheckResponse,
  ExerciseResponse,
  VocabularyResponse,
  SummaryResponse,
  GeminiErrorResponse,
} from './../../types/ai.respond';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
    } else {
      throw new Error('GEMINI_API_KEY is not set');
    }
  }

  private async runPrompt(prompt: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-1.5-flash-latest',
      });

      const result = await model.generateContent(prompt);

      const response = await result.response;
      const text = response.text();

      return text;
    } catch (e) {
      console.error('Error calling Gemini API:', e);
      return `{"error": "Failed to get a valid response from Gemini API", "details": "${e.message}"}`;
    }
  }

  async checkGrammar(
    grammarCheckDto: GrammarCheckDto,
  ): Promise<GrammarCheckResponse | GeminiErrorResponse> {
    const { text } = grammarCheckDto;

    const prompt = `
    You are an English grammar checker.
    Analyze the text below, correct any grammar mistakes, and explain the corrections.

    Text:
    ${text}

    IMPORTANT: Return ONLY the JSON object, without any markdown formatting like \`\`\`json or \`\`\`.
    The JSON format must be:
    {
      "originalText": "...",
      "correctedText": "...",
      "corrections": [
        {
          "original": "...",
          "corrected": "...",
          "explanation": "...",
          "position": { "start": number, "end": number }
        }
      ],
      "suggestions": ["...", "..."]
    }
    `;

    const rawResponse = await this.runPrompt(prompt);

    try {
      return JSON.parse(rawResponse);
    } catch {
      return { error: 'Invalid JSON format from Gemini', raw: rawResponse };
    }
  }

  async generateExercise(
    generateExerciseDto: GenerateExerciseDto,
  ): Promise<ExerciseResponse | GeminiErrorResponse> {
    const { content, type = 'quiz', level = 'beginner' } = generateExerciseDto;

    const prompt = `
      Generate a ${type} exercise for English learners at ${level} level based on the following content:

      "${content}"

      IMPORTANT: Return ONLY the JSON object, without any markdown formatting like \`\`\`json or \`\`\`.
      The JSON format must be:
      {
        "type": "${type}",
        "level": "${level}",
        "title": "...",
        "instructions": "...",
        "questions": [
          {
            "id": number,
            "question": "...",
            "options": ["...","...","...","..."],
            "correctAnswer": number,
            "explanation": "..."
          }
        ],
        "sourceContent": "${content}"
      }
      `;
    const textResponse = await this.runPrompt(prompt);
    try {
      return JSON.parse(textResponse);
    } catch {
      return { error: 'Invalid JSON format from Gemini', raw: textResponse };
    }
  }

  async generateVocabulary(
    text: string,
  ): Promise<VocabularyResponse | GeminiErrorResponse> {
    const prompt = `
      Extract important vocabulary words from the following text, with definitions, examples, and CEFR levels.

      Text:
      ${text}

      IMPORTANT: Return ONLY the JSON object, without any markdown formatting like \`\`\`json or \`\`\`.
      The JSON format must be:
      {
        "words": [
          {
            "word": "...",
            "definition": "...",
            "example": "...",
            "level": "beginner|intermediate|advanced"
          }
        ],
        "sourceText": "${text}"
      }
      `;

    const textResponse = await this.runPrompt(prompt);
    try {
      return JSON.parse(textResponse);
    } catch {
      return { error: 'Invalid JSON format from Gemini', raw: textResponse };
    }
  }

  async generateSummary(
    text: string,
  ): Promise<SummaryResponse | GeminiErrorResponse> {
    const prompt = `
Summarize the following text into a short paragraph and provide 3 key points.

Text:
${text}

IMPORTANT: Return ONLY the JSON object, without any markdown formatting like \`\`\`json or \`\`\`.
The JSON format must be:
{
  "summary": "...",
  "keyPoints": ["...", "...", "..."],
  "originalLength": ${text.length},
  "summaryLength": number
}
`;

    const textResponse = await this.runPrompt(prompt);
    try {
      return JSON.parse(textResponse);
    } catch {
      return { error: 'Invalid JSON format from Gemini', raw: textResponse };
    }
  }
}
