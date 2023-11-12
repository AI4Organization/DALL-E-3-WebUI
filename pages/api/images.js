import { OpenAI } from 'openai';

export default async function handler(req, res) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.images.generate({
    prompt: req.query.p,
    n: parseInt(req.query.n), // TODO n = 1, implement: quality?: 'standard' | 'hd'; size?: '1024x1024' | '1792x1024' | '1024x1792'; style?: 'vivid' | 'natural';
    size: "1024x1024",
    model: 'dall-e-3'
  }, {
    stream: true
  });
  console.log(response.data);
  res.status(200).json({ result: response.data });
}
