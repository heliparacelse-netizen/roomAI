function applyWatermark(mode, customText) {
  const watermark = document.getElementById('watermark');
  if (!watermark) {
    return;
  }

  if (mode === 'premium') {
    watermark.style.display = customText ? 'block' : 'none';
    watermark.textContent = customText || '';
  } else {
    watermark.style.display = 'block';
    watermark.textContent = 'RoomAI Free';
  }
}

window.watermark = {
  applyWatermark
};
