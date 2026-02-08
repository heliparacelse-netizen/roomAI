export function getWatermarkMode(req) {
  const plan = req.headers['x-plan'] || 'free';
  if (plan === 'premium') {
    return { mode: 'premium', customText: '' };
  }
  return { mode: 'free', customText: 'RoomAI Free' };
}
