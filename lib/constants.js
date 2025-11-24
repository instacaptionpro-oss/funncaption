// All plan configurations
export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    quota: 3,
    resetPeriod: 'daily',
    moods: 2,
    variants: 1,
    vibes: false,
    saveHistory: false,
    rewrite: false
  },
  oneday: {
    name: 'One-Day Pass',
    price: 6,
    quota: 2,
    resetPeriod: 'oneday',
    moods: 30,
    variants: 'all',
    vibes: false,
    saveHistory: false,
    rewrite: false
  },
  basic: {
    name: 'Basic',
    price: 99,
    quota: 30,
    resetPeriod: 'monthly',
    moods: 20,
    variants: 3,
    vibes: false,
    saveHistory: false,
    rewrite: false
  },
  pro: {
    name: 'Pro',
    price: 249,
    quota: 120,
    resetPeriod: 'monthly',
    moods: 30,
    variants: 5,
    vibes: ['Desi Style', 'Gen Z Style'],
    saveHistory: true,
    rewrite: 'simple'
  },
  classic: {
    name: 'Classic',
    price: 459,
    quota: 300,
    resetPeriod: 'monthly',
    moods: 30,
    variants: 10,
    vibes: 'all',
    saveHistory: true,
    rewrite: 'advanced',
    folders: true
  },
  business: {
    name: 'Business',
    price: 999,
    quota: 1000,
    resetPeriod: 'monthly',
    moods: 30,
    variants: 15,
    vibes: 'all',
    saveHistory: true,
    rewrite: 'unlimited',
    folders: true,
    teamSeats: 3,
    analytics: true,
    api: true
  }
}

// All 30 moods
export const MOODS = [
  'Happy & Excited',
  'Professional',
  'Funny & Witty',
  'Inspirational',
  'Romantic',
  'Motivational',
  'Casual & Chill',
  'Bold & Confident',
  'Grateful',
  'Nostalgic',
  'Adventurous',
  'Sassy',
  'Thoughtful',
  'Energetic',
  'Humble',
  'Sarcastic',
  'Dreamy',
  'Fierce',
  'Calm & Peaceful',
  'Party Vibes',
  'Emotional',
  'Mysterious',
  'Playful',
  'Elegant',
  'Savage',
  'Proud',
  'Candid',
  'Quirky',
  'Luxurious',
  'Rebellious'
]

// All 18 regional vibes with belonging lines
export const VIBES = [
  {
    name: 'Gujju Style',
    line: 'આ અમારા કાઠીયાવાડી મોજ હા ભાઈ હા 🦁',
    requiredPlan: 'classic'
  },
  {
    name: 'Punjabi Style',
    line: 'ਇਹੋ ਜਿਹੀ ਸਾਡੀ ਵਾਈਬ ਆ ਯਾਰ 🔥',
    requiredPlan: 'classic'
  },
  {
    name: 'Marathi Style',
    line: 'हीच आमची पुणेरी स्टाइल - मराठा मनाचं सत्य! 🚩❤️',
    requiredPlan: 'classic'
  },
  {
    name: 'Bengali Style',
    line: 'এই তো আমাদের বাঙালি ভাইব - প্রাণের বাংলা, হৃদয়ের বাংলা! 🐟📚💛',
    requiredPlan: 'classic'
  },
  {
    name: 'Tamil Style',
    line: 'இதுதான் நம்ம ஸ்டைல் மச்சி - தமிழ் இதயம், தமிழ் பெருமை! 🔥🎬❤️',
    requiredPlan: 'classic'
  },
  {
    name: 'Telugu Style',
    line: 'ఇదే మన తెలుగు వైబ్ రా - తెలుగు గుండె, తెలుగు అభిమానం! 🎆💪❤️',
    requiredPlan: 'classic'
  },
  {
    name: 'Kannada Style',
    line: 'ಇದೇ ನಮ್ಮ ಕರ್ನಾಟಕ ಸ್ಟೈಲ್ ಮಗಾ - ಕನ್ನಡ ಹೃದಯ, ಕನ್ನಡ ಹೆಮ್ಮೆ! 🚩❤️',
    requiredPlan: 'classic'
  },
  {
    name: 'Malayalam Style',
    line: 'ഇതാണ് നമ്മുടെ മലയാളി വൈബ് - കേരള ഹൃദയം, നമ്മുടെ അഭിമാനം! 🌴⛵💚',
    requiredPlan: 'classic'
  },
  {
    name: 'Desi Style',
    line: 'अपनी मिट्टी, अपनी वाइब - दिल से देसी, रूह से हिंदुस्तानी! 🇮🇳❤️',
    requiredPlan: 'pro'
  },
  {
    name: 'Gen Z Style',
    line: 'They copy, we create trends 💅✨🔥',
    requiredPlan: 'pro'
  },
  {
    name: 'Professional Style',
    line: 'Excellence isn\'t an act, it\'s our habit. 📈💼❤️',
    requiredPlan: 'free'
  },
  {
    name: 'Rajasthani Style',
    line: 'म्हारी राजस्थानी शान - धोरों का दिल, वीरों की धरती! 🐪👑❤️',
    requiredPlan: 'classic'
  },
  {
    name: 'Bihari Style',
    line: 'ई बा हमार बिहारी अंदाज़ - सादगी में महानता! 💪🌾❤️',
    requiredPlan: 'classic'
  },
  {
    name: 'Haryanvi Style',
    line: 'म्हारी हरयाणवी की बात न्यारी - ताकत और सच्चाई का दम! 🔥🥛💪',
    requiredPlan: 'classic'
  },
  {
    name: 'UP Style',
    line: 'बनारसी पान वाली बात - गंगा-जमुनी तहज़ीब, दिल से उत्तर प्रदेशी! 🙏🕉️❤️',
    requiredPlan: 'classic'
  },
  {
    name: 'Kashmiri Style',
    line: 'یہ ہماری کشمیری وائب ہے یار - जन्नत का दिल, कश्मीर की रूह! 🏔️🌷❤️',
    requiredPlan: 'classic'
  },
  {
    name: 'Assamese Style',
    line: 'এইটোৱেই আমাৰ অসমীয়া ভাইব - ব্ৰহ্মপুত্ৰৰ বুকুত, অসমৰ হৃদয়ত! 🦏🍵❤️',
    requiredPlan: 'classic'
  },
  {
    name: 'Odia Style',
    line: 'ଏହା ଆମର ଓଡ଼ିଆ ଷ୍ଟାଇଲ୍ - ଜଗନ୍ନାଥଙ୍କ ଆଶୀର୍ବାଦ, ଓଡ଼ିଶାର ଗର୍ବ! 🏖️🦀❤️',
    requiredPlan: 'classic'
  }
]
