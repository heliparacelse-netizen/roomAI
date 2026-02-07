const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:4000'
  : 'https://your-render-backend.onrender.com';

const viewer = new window.Viewer3D(document.getElementById('viewerContainer'));
const languageSelect = document.getElementById('languageSelect');
const analyzeButton = document.getElementById('analyzeButton');
const analysisStatus = document.getElementById('analysisStatus');
const roomImage = document.getElementById('roomImage');
const styleSelector = document.getElementById('styleSelector');
const toggleAutoRotate = document.getElementById('toggleAutoRotate');
const toggleFullscreen = document.getElementById('toggleFullscreen');
const takeScreenshot = document.getElementById('takeScreenshot');
const lightIntensity = document.getElementById('lightIntensity');
const zoomLevel = document.getElementById('zoomLevel');
const upgradeButton = document.getElementById('upgradeButton');
const avatarUpload = document.getElementById('avatarUpload');
const avatarPreview = document.getElementById('avatarPreview');
const displayName = document.getElementById('displayName');
const saveProfile = document.getElementById('saveProfile');

window.i18n.applyTranslations(languageSelect.value);
window.watermark.applyWatermark('free');

languageSelect.addEventListener('change', (event) => {
  window.i18n.applyTranslations(event.target.value);
});

styleSelector.addEventListener('click', (event) => {
  if (!event.target.matches('.chip')) {
    return;
  }
  document.querySelectorAll('.chip').forEach((chip) => chip.classList.remove('active'));
  event.target.classList.add('active');
  const style = event.target.dataset.style;
  setStatus(`Style: ${style}`);
});

toggleAutoRotate.addEventListener('click', () => {
  viewer.toggleAutoRotate();
});

toggleFullscreen.addEventListener('click', () => {
  viewer.toggleFullscreen();
});

takeScreenshot.addEventListener('click', () => {
  const dataUrl = viewer.exportImage();
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'roomai.png';
  link.click();
});

lightIntensity.addEventListener('input', (event) => {
  viewer.updateLighting(Number(event.target.value));
});

zoomLevel.addEventListener('input', (event) => {
  viewer.updateZoom(Number(event.target.value));
});

upgradeButton.addEventListener('click', async () => {
  const response = await fetch(`${API_BASE}/api/payments/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan: 'premium' })
  });
  const data = await response.json();
  if (data.url) {
    window.location.href = data.url;
  }
});

avatarUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = (loadEvent) => {
    avatarPreview.src = loadEvent.target.result;
  };
  reader.readAsDataURL(file);
});

saveProfile.addEventListener('click', async () => {
  const payload = {
    displayName: displayName.value,
    avatar: avatarPreview.src
  };
  await fetch(`${API_BASE}/api/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  setStatus('Profil mis à jour.');
});

analyzeButton.addEventListener('click', async () => {
  const file = roomImage.files[0];
  if (!file) {
    setStatus('Ajoutez une image.');
    return;
  }

  setStatus("Analyse en cours...");
  const formData = new FormData();
  formData.append('image', file);

  const uploadResponse = await fetch(`${API_BASE}/api/upload-image`, {
    method: 'POST',
    body: formData
  });
  const uploadData = await uploadResponse.json();

  const analyzeResponse = await fetch(`${API_BASE}/api/analyze-scene`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl: uploadData.url, roomType: getRoomType() })
  });
  const analyzeData = await analyzeResponse.json();
  viewer.addAssets(analyzeData.assets || []);
  if (analyzeData.watermark) {
    window.watermark.applyWatermark(analyzeData.watermark.mode, analyzeData.watermark.customText);
  }
  setStatus('Analyse terminée.');
});

function getRoomType() {
  return document.getElementById('roomType').value;
}

function setStatus(message) {
  analysisStatus.textContent = message;
}
