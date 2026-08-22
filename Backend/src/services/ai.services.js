const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const ai = process.env.GOOGLE_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY })
  : null;

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question that can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, and what approach to take")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question that can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, and what approach to take")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap")
    })).describe("List of skill gaps in the candidate's profile and their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day"),
        tasks: z.array(z.string()).describe("Tasks to complete on this day")
    })).describe("A day-wise preparation plan to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated")
});

function fallbackInterviewReport({ resume, selfDescription, jobDescription }) {
    const text = `${resume || ''} ${selfDescription || ''}`.trim();
    const score = text.length > 0 ? Math.min(95, Math.max(55, Math.round(text.length / 30))) : 70;

    return {
        matchScore: score,
        technicalQuestions: [
            {
                question: 'Describe a project where you solved a complex frontend or backend problem.',
                intention: 'Check problem-solving and ownership.',
                answer: 'Explain the problem, your approach, trade-offs, and measurable impact.'
            }
        ],
        behavioralQuestions: [
            {
                question: 'Tell us about a time you handled conflict or a difficult teammate situation.',
                intention: 'Observe communication and collaboration skills.',
                answer: 'Describe the issue, your actions, and the constructive outcome.'
            }
        ],
        skillGaps: [
            { skill: 'Communication', severity: 'medium' }
        ],
        preparationPlan: [
            { day: 1, focus: 'Review role requirements and align strengths', tasks: ['Study the job description', 'List relevant projects'] },
            { day: 2, focus: 'Practice technical problem solving', tasks: ['Solve 2 coding questions', 'Review system design basics'] }
        ],
        title: jobDescription ? jobDescription.slice(0, 60) || 'Interview Role' : 'Interview Role'
    };
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    if (!ai || !process.env.GOOGLE_API_KEY) {
        return fallbackInterviewReport({ resume, selfDescription, jobDescription });
    }

    const prompt = `Generate an interview report for a candidate with the following details:\nResume: ${resume}\nSelf Description: ${selfDescription}\nJob Description: ${jobDescription}`;

    try {
        const response = await ai.models.generateContent({
            model:  "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: { type: 'object', properties: { matchScore: { type: 'number' }, technicalQuestions: { type: 'array', items: { type: 'object', properties: { question: { type: 'string' }, intention: { type: 'string' }, answer: { type: 'string' } }, required: ['question', 'intention', 'answer'] } }, behavioralQuestions: { type: 'array', items: { type: 'object', properties: { question: { type: 'string' }, intention: { type: 'string' }, answer: { type: 'string' } }, required: ['question', 'intention', 'answer'] } }, skillGaps: { type: 'array', items: { type: 'object', properties: { skill: { type: 'string' }, severity: { type: 'string', enum: ['low', 'medium', 'high'] } }, required: ['skill', 'severity'] } }, preparationPlan: { type: 'array', items: { type: 'object', properties: { day: { type: 'number' }, focus: { type: 'string' }, tasks: { type: 'array', items: { type: 'string' } } }, required: ['day', 'focus', 'tasks'] } }, title: { type: 'string' } }, required: ['matchScore', 'technicalQuestions', 'behavioralQuestions', 'skillGaps', 'preparationPlan', 'title'] }
            }
        });

        return JSON.parse(response.text);
    } catch (error) {
        console.error('AI report generation failed, using fallback data:', error.message || error);
        return fallbackInterviewReport({ resume, selfDescription, jobDescription });
    }
}

async function invokeGeminiAi() {
    if (!process.env.GOOGLE_API_KEY) {
        console.log('GOOGLE_API_KEY not set. Skipping Gemini AI initialization.');
        return;
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'Hello Gemini! Explain what interview is.'
        });

        console.log(response.text);
    } catch (err) {
        console.error('Gemini AI request failed:', err.message || err);
        if (err.cause) {
            console.error('Underlying cause:', err.cause);
        }
    }
}

module.exports = { generateInterviewReport, invokeGeminiAi };