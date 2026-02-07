import fetch from 'node-fetch';

const HF_BASE = 'https://api-inference.huggingface.co/models';

export async function inferMissingObjects({ roomType, detectedObjects }) {
  const model = process.env.GLM_MODEL || 'THUDM/glm-4-9b-chat';
  const prompt = `List missing objects for a ${roomType} interior. Existing objects: ${detectedObjects.join(', ')}. Return comma separated nouns only.`;

  const response = await fetch(`${HF_BASE}/${model}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputs: prompt })
  });

  if (!response.ok) {
    return ['plant', 'decor'];
  }

  const result = await response.json();
  const text = Array.isArray(result) ? result[0]?.generated_text : result?.generated_text;
  if (!text) {
    return ['plant', 'decor'];
  }

  return text
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter((item) => item.length > 2)
    .slice(0, 5);
}
