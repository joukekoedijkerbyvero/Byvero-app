const translations = {
  nl: {
    'welcome.eyebrow': 'Jouw onafhankelijke aankoopassistent in Spanje',
    'welcome.title': 'Vind het Spaanse huis dat écht bij je past.',
    'welcome.body': 'byVERO helpt je ontdekken waar je het beste kunt kopen, wat je werkelijk kunt besteden en welke woningen bij jouw leven passen.',
    'welcome.cta': 'Start mijn byVERO Match',
    'welcome.microcopy': 'Gratis · ±3 minuten · Geen verplichtingen',
    'welcome.alreadySearching': 'Ben je al aan het zoeken?',
    'welcome.teaser': 'Binnenkort kun je iedere woning van Idealista, Fotocasa of een lokale makelaar toevoegen en door byVERO laten beoordelen.',
    'progress.label': 'Stap 1 van 8',
    'purpose.eyebrow': 'Laten we je zoekprofiel bouwen',
    'purpose.title': 'Waarvoor zoek je een woning in Spanje?',
    'purpose.intro': 'Kies wat het beste past. Je kunt dit later altijd aanpassen.',
    'purpose.permanent.title': 'Permanent wonen',
    'purpose.permanent.body': 'Ik wil het grootste deel van het jaar in Spanje wonen.',
    'purpose.second.title': 'Tweede woning',
    'purpose.second.body': 'Een eigen plek voor vakanties en langere verblijven.',
    'purpose.investment.title': 'Investering',
    'purpose.investment.body': 'Rendement en verhuurmogelijkheden zijn belangrijk.',
    'purpose.mixed.title': 'Een combinatie',
    'purpose.mixed.body': 'Zelf genieten en verhuren wanneer ik er niet ben.',
    'common.back': 'Terug',
    'common.continue': 'Verder',
    'feedback.permanent': 'Goed om te weten: byVERO zal extra gewicht geven aan voorzieningen, zorg, bereikbaarheid en leven buiten het seizoen.',
    'feedback.second_home': 'Goed om te weten: byVERO zal extra letten op sfeer, zee, onderhoudsgemak en bereikbaarheid.',
    'feedback.investment': 'Goed om te weten: byVERO zal later extra kijken naar verhuurbaarheid, bereikbaarheid en vraag in de markt.',
    'feedback.mixed': 'Goed om te weten: byVERO zoekt naar de balans tussen eigen woongenot en praktisch verhuurpotentieel.',
    'next.title': 'Mooi. Je eerste voorkeur is opgeslagen.',
    'next.body': 'De volgende bouwstap voegt kooptermijn, lifestyle, woningvoorkeuren, budget en de eerste Location Match toe.',
    'next.restart': 'Opnieuw bekijken',
    'saved.permanent': 'Je zoekt een woning om permanent in Spanje te wonen.',
    'saved.second_home': 'Je zoekt een tweede woning voor vakanties en langere verblijven.',
    'saved.investment': 'Je zoekt primair een vastgoedinvestering.',
    'saved.mixed': 'Je zoekt een combinatie van eigen gebruik en verhuur.'
  },
  en: {
    'welcome.eyebrow': 'Your independent home-buying assistant in Spain',
    'welcome.title': 'Find the Spanish home that actually fits you.',
    'welcome.body': 'byVERO helps you discover where to buy, understand what you can really afford and see which homes truly fit your life.',
    'welcome.cta': 'Start my byVERO Match',
    'welcome.microcopy': 'Free · ±3 minutes · No obligation',
    'welcome.alreadySearching': 'Already searching?',
    'welcome.teaser': 'Soon you can add any property from Idealista, Fotocasa or a local agent and let byVERO assess how well it fits you.',
    'progress.label': 'Step 1 of 8',
    'purpose.eyebrow': 'Let’s build your buying profile',
    'purpose.title': 'What are you looking for in Spain?',
    'purpose.intro': 'Choose what fits best. You can always change this later.',
    'purpose.permanent.title': 'My permanent home',
    'purpose.permanent.body': 'I want to live in Spain most of the year.',
    'purpose.second.title': 'A second home',
    'purpose.second.body': 'My own place for holidays and longer stays.',
    'purpose.investment.title': 'Investment',
    'purpose.investment.body': 'Return and rental potential matter most.',
    'purpose.mixed.title': 'A bit of both',
    'purpose.mixed.body': 'Enjoy it myself and rent it when I’m away.',
    'common.back': 'Back',
    'common.continue': 'Continue',
    'feedback.permanent': 'Good to know: byVERO will give extra weight to year-round amenities, healthcare, accessibility and everyday life.',
    'feedback.second_home': 'Good to know: byVERO will give extra weight to atmosphere, sea access, low maintenance and accessibility.',
    'feedback.investment': 'Good to know: byVERO will later look more closely at rental potential, accessibility and market demand.',
    'feedback.mixed': 'Good to know: byVERO will look for the best balance between personal enjoyment and practical rental potential.',
    'next.title': 'Nice. Your first preference has been saved.',
    'next.body': 'The next build step adds buying timeline, lifestyle, property preferences, budget and your first Location Match.',
    'next.restart': 'View again',
    'saved.permanent': 'You are looking for a home to live in Spain permanently.',
    'saved.second_home': 'You are looking for a second home for holidays and longer stays.',
    'saved.investment': 'You are primarily looking for a property investment.',
    'saved.mixed': 'You are looking for a mix of personal use and rental.'
  }
};

let lang = localStorage.getItem('byvero_language') || (navigator.language?.toLowerCase().startsWith('nl') ? 'nl' : 'en');
let selectedPurpose = localStorage.getItem('byvero_buying_purpose') || null;

const screens = [...document.querySelectorAll('.screen')];
const langNl = document.getElementById('lang-nl');
const langEn = document.getElementById('lang-en');
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
const continueBtn = document.getElementById('continue-btn');
const restartBtn = document.getElementById('restart-btn');
const feedback = document.getElementById('value-feedback');
const savedAnswer = document.getElementById('saved-answer');
const optionCards = [...document.querySelectorAll('.option-card')];

function t(key) { return translations[lang][key] ?? key; }

function applyLanguage() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  langNl.classList.toggle('active', lang === 'nl');
  langEn.classList.toggle('active', lang === 'en');
  localStorage.setItem('byvero_language', lang);
  if (selectedPurpose) renderSelection();
  if (savedAnswer.textContent) savedAnswer.textContent = t(`saved.${selectedPurpose}`);
}

function showScreen(id) {
  screens.forEach(s => s.classList.remove('active-screen'));
  document.getElementById(id).classList.add('active-screen');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderSelection() {
  optionCards.forEach(card => card.classList.toggle('selected', card.dataset.value === selectedPurpose));
  continueBtn.disabled = !selectedPurpose;
  if (selectedPurpose) {
    feedback.textContent = t(`feedback.${selectedPurpose}`);
    feedback.classList.remove('hidden');
  } else {
    feedback.classList.add('hidden');
  }
}

langNl.addEventListener('click', () => { lang = 'nl'; applyLanguage(); });
langEn.addEventListener('click', () => { lang = 'en'; applyLanguage(); });
startBtn.addEventListener('click', () => showScreen('screen-purpose'));
backBtn.addEventListener('click', () => showScreen('screen-welcome'));
restartBtn.addEventListener('click', () => showScreen('screen-welcome'));

optionCards.forEach(card => {
  card.addEventListener('click', () => {
    selectedPurpose = card.dataset.value;
    localStorage.setItem('byvero_buying_purpose', selectedPurpose);
    renderSelection();
  });
});

continueBtn.addEventListener('click', () => {
  if (!selectedPurpose) return;
  savedAnswer.textContent = t(`saved.${selectedPurpose}`);
  showScreen('screen-next');
});

applyLanguage();
renderSelection();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
