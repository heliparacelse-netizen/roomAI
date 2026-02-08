const translations = {
  fr: {
    title: 'Concevez votre intérieur en 3D',
    subtitle: 'Analyse IA + rendu 3D temps réel + styles instantanés.',
    uploadTitle: 'Analyse de votre pièce',
    uploadAction: 'Télécharger une photo',
    analyze: "Lancer l'analyse",
    roomType: 'Type de pièce',
    style: 'Style',
    profile: 'Profil',
    save: 'Enregistrer',
    autoRotate: 'Auto-rotation',
    fullscreen: 'Plein écran',
    screenshot: 'Screenshot',
    light: 'Éclairage',
    zoom: 'Zoom'
  },
  en: {
    title: 'Design your interior in 3D',
    subtitle: 'AI analysis + real-time 3D render + instant styles.',
    uploadTitle: 'Analyze your room',
    uploadAction: 'Upload a photo',
    analyze: 'Run analysis',
    roomType: 'Room type',
    style: 'Style',
    profile: 'Profile',
    save: 'Save',
    autoRotate: 'Auto-rotate',
    fullscreen: 'Fullscreen',
    screenshot: 'Screenshot',
    light: 'Lighting',
    zoom: 'Zoom'
  }
};

function applyTranslations(language) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = translations[language][key] || element.textContent;
  });
}

window.i18n = {
  translations,
  applyTranslations
};
