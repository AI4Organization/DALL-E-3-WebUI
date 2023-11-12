import { OpenAI } from 'openai';

export default async function handler(req, res) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.images.generate({
    prompt: req.query.p,
    n: parseInt(req.query.n),
    size: req.query.s,
    model: 'dall-e-3',
    quality: req.query.q,
    style: req.query.st,
  });
  console.log(response.data);
  res.status(200).json({ result: response.data });
}
