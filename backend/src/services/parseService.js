import { PARSER_PROMPT } from '../constants/constants.js';
import { model } from './llmClient.js';

async function parseTaskFromText(input) {
  const prompt = `${PARSER_PROMPT}\n\nUser Input: ${input}`;
  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    text = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    const data = JSON.parse(text);
    return data;
  } catch (err) {
    return {
      title: input.slice(0, 30),
      description: input,
      dueDate: null,
      priority: null,
      status: 'todo',
    };
  }
}

export const getParsedTaskFromText = async (req, res) => {
  try {
    const { text } = req.body;
    const parsedTask = await parseTaskFromText(text);
    res.status(200).json({ success: true, data: parsedTask });
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse task from text' });
  }
};
