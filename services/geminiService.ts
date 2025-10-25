
import { GoogleGenAI, Type } from "@google/genai";
import { TOTAL_QUESTIONS } from '../constants';
import { IQQuestion } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const questionSchema = {
    type: Type.OBJECT,
    properties: {
        questionText: { type: Type.STRING },
        options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
        },
        correctAnswerIndex: { type: Type.INTEGER },
        questionType: { type: Type.STRING },
        imageUrl: { type: Type.STRING, nullable: true },
    },
    required: ['questionText', 'options', 'correctAnswerIndex', 'questionType'],
};


export const generateIQQuestions = async (): Promise<IQQuestion[]> => {
    try {
        const prompt = `
        You are an expert psychometrician creating questions for a fun, mobile IQ test app.
        Generate a list of ${TOTAL_QUESTIONS} unique multiple-choice questions that test various aspects of fluid intelligence, including logical reasoning, pattern recognition, spatial reasoning, and verbal analogies.

        Ensure the questions have a mix of difficulties (easy, medium, hard).
        Each question must have exactly 4 options.
        For any visual questions, use placeholder images from \`https://picsum.photos/400/200?random=SEED\`, where SEED is a unique integer for each image.
        The output must be a valid JSON array of question objects, adhering to the provided schema.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: questionSchema,
                },
            },
        });

        const jsonText = response.text;
        const questions = JSON.parse(jsonText) as IQQuestion[];

        // Basic validation
        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error("Generated content is not a valid array of questions.");
        }

        return questions;
    } catch (error) {
        console.error("Error generating IQ questions:", error);
        // Fallback to mock data if API fails
        return generateMockQuestions();
    }
};

const generateMockQuestions = (): IQQuestion[] => {
    return [
        {
            questionText: "Which number should come next in the series: 2, 6, 12, 20, 30, ?",
            options: ["42", "40", "36", "48"],
            correctAnswerIndex: 0,
            questionType: "Pattern Recognition",
        },
        {
            questionText: "Book is to Reading as Fork is to:",
            options: ["Drawing", "Writing", "Stirring", "Eating"],
            correctAnswerIndex: 3,
            questionType: "Verbal Analogy",
        },
        {
            questionText: "Which of the following figures is the odd one out?",
            imageUrl: "https://picsum.photos/400/200?random=1",
            options: ["A", "B", "C", "D"],
            correctAnswerIndex: 2,
            questionType: "Spatial Reasoning",
        },
        ...Array.from({ length: TOTAL_QUESTIONS - 3 }, (_, i) => ({
            questionText: `Mock Question ${i + 4}: What is the answer?`,
            options: ["A", "B", "C", "D"],
            correctAnswerIndex: i % 4,
            questionType: "Logical Reasoning",
        })),
    ];
};
