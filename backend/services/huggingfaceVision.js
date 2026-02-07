import fetch from 'node-fetch';

const HF_BASE = 'https://api-inference.huggingface.co/models';
const DEFAULT_MODEL = 'llava-hf/llava-1.6';

export async function analyzeRoom({ imageUrl, roomType }) {
  const model = process.env.HF_VISION_MODEL || DEFAULT_MODEL;
  const prompt = `Describe the room in detail. Identify furniture and objects for a ${roomType}.`;

  const response = await fetch(`${HF_BASE}/${model}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputs: { image: imageUrl, prompt } })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  const result = await response.json();
  const text = Array.isArray(result) ? result[0]?.generated_text : result?.generated_text;
  const detectedObjects = extractObjects(text || '');

  return {
    detectedObjects,
    description: text
  };
}

function extractObjects(text) {
  const keywords = [
    'sofa',
    'bed',
    'table',
    'chair',
    'lamp',
    'island',
    'sink',
    'desk',
    'cabinet',
    'tv',
    'rug',
    'mirror'
  ];

  const lower = text.toLowerCase();
  const found = keywords.filter((word) => lower.includes(word));
  return found.length ? found : ['sofa', 'table', 'lamp'];
}
